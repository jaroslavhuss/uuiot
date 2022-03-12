import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AuthDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

import { GatewayLogInDto } from 'src/gateway/dto';
import { Gateway, GatewayDocument } from 'src/schemas';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
  ) {}

  async signup(dto: SignUpDto) {
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
    return this.signToken(user._id, user.email, user.authLevel, user);
  }

  async signin(dto: AuthDto) {
    //find user by email
    const user = await this.userModel.findOne({
      email: dto.email,
    });

    if (!user) throw new BadRequestException('This user does not exists');

    //compare passwords
    const passwordMatch: boolean = await argon.verify(
      user.password,
      dto.password,
    );
    if (!passwordMatch) throw new BadRequestException('Wrong password');
    await this.userModel.findOneAndUpdate(
      { _id: user.id },
      { lastLoggedIn: new Date() },
      { new: true },
    );
    return this.signToken(user.id, user.email, user.authLevel, user);
  }

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

  async signToken(
    userId: number,
    email: string,
    authLevel: string,
    user: User,
  ): Promise<{ access_token: string; user: User }> {
    const config = new ConfigService();
    const payload = {
      sub: userId,
      email,
      authLevel,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: config.get('JWT_EXPIRE'),
      secret: config.get('JWT_SECRET'),
    });
    return { access_token: token, user };
  }
}
