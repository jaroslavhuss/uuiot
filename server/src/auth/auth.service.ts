import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthDto, SignUpDto, UserIdDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';
import {User, UserDocument} from "../schemas/user.schema"
import { Model } from 'mongoose';

import { GatewayLogInDto } from '../gateway/dto';
import { Gateway, GatewayDocument } from '../schemas';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
  ) {}
  async signup(dto: SignUpDto): Promise<Tokens> {
    //Password actually matches
    if (dto.password !== dto.confirmedPassword)
      throw new BadRequestException(
        'Password and Confirmed password are different!',
      );
    //generate the password hash
    const hashedPwd = await argon.hash(dto.password);
    const findIfMongoEmailIsTaken = await this.userModel.findOne({
      email: dto.email,
    });
    if (findIfMongoEmailIsTaken)
      throw new BadRequestException('Email is already taken!');

    const user = await this.userModel.create({
      password: hashedPwd,
      email: dto.email,
      isUserApproved: false,
      name: dto.name,
      surname: dto.surname,
    });

    const tokens = await this.signToken(user._id, user.email, user.authLevel);
    await this.userModel.findByIdAndUpdate(
      user._id,
      {
        refresh_token: tokens.refresh_token,
      },
      {
        new: true,
      },
    );
    return tokens;
  }

  async signin(dto: AuthDto): Promise<any> {
    //find user by email
    const user = await this.userModel.findOne({
      email: dto.email,
    })

    if (!user) throw new ForbiddenException('This user does not exists');
    if (!user.isUserApproved) throw new ForbiddenException("User was not approved yet ");
    //compare passwords
    const passwordMatch: boolean = await argon.verify(
      user.password,
      dto.password,
    );
    if (!passwordMatch) throw new BadRequestException('Wrong password');

    const tokens = await this.signToken(user._id, user.email, user.authLevel);
    const {createdAt, updatedAt, email, name, surname, isUserApproved, lastLoggedIn, refresh_token, authLevel} = user;
    const newObject = {
      createdAt, updatedAt, email, name, surname, isUserApproved, lastLoggedIn, refresh_token, authLevel
    }
    console.log(newObject)
    return {
      tokens,
      user:newObject
    };
  }

  async logout(id: UserIdDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id.id,
      {
        refresh_token: '',
      },
      { new: true },
    ).select("-password")
    if (!user)
      throw new BadRequestException(
        'User could not be logged off since it does not exist',
      );
    delete user.password;
    return user;
  }

  async signToken(
    userId: number,
    email: string,
    authLevel: string,
  ): Promise<Tokens> {
    const config = new ConfigService();
    const payload = {
      sub: userId,
      email,
      authLevel,
    };
    //Access token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: config.get('JWT_EXPIRE'),
      secret: config.get('JWT_SECRET'),
    });
    //Refresh token
    const rToken = await this.jwt.signAsync(payload, {
      expiresIn: config.get('JWT_EXPIRE_REFRESH'),
      secret: config.get('JWT_REFRESH_SECRET'),
    });

    return { access_token: token, refresh_token: rToken };
  }

  //Update refresh token function

  async updateRefreshToken(
    userId: string,
    refresh_token: string,
  ): Promise<void> {
    const hash = await argon.hash(refresh_token);
    await this.userModel.findByIdAndUpdate(userId, {
      rtToken: hash,
    });
  }

  /**
   * GW LOGIC IS HERE
   */
  async gatewaySignIn(dto: GatewayLogInDto) {
    const gateway = await this.gatewayModel.findOne({ name: dto.name });
    if (!gateway) throw new BadRequestException('This gateway does not exist!');
    const passwordMatch: boolean = await argon.verify(
      gateway.password,
      dto.password,
    );
    if (!passwordMatch) throw new BadRequestException('Wrong password');
    return this.gatewaySignToken(dto.name);
  }

  async gatewaySignToken(name: string): Promise<any> {
    const config = new ConfigService();
    const token = await this.jwt.signAsync(
      { name },
      {
        expiresIn: config.get('JWT_EXPIRE'),
        secret: config.get('JWT_SECRET'),
      },
    );
    return { gateway_access_token: token };
  }
}
