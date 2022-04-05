import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Gateway, GatewayDocument } from 'src/schemas';
import { Model } from 'mongoose';

interface payLoadInterface {
  sub: number;
  email: string;
  authLevel: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.userModel
      .findById({ _id: payload.sub })
      .select('-password');
    if (!user) throw new ForbiddenException('You must be logged in!');

    if (!user.isUserApproved)
      throw new ForbiddenException(
        `${user.name} ${user.surname} was not approved yet by the admin!`,
      );
    delete user.password;
    return { user, payload };
  }
}

@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy, 'jwtadmin') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: payLoadInterface) {
    const user = await this.userModel
      .findById({ _id: payload.sub })
      .select('-password');
    if (!user) throw new ForbiddenException('You must be logged in!');
    if (!user.isUserApproved)
      throw new ForbiddenException(
        `${user.name} ${user.surname} was not approved yet by the admin!`,
      );
    if (user.authLevel !== 'iotadmin')
      throw new ForbiddenException('Not enough privileges!');
    return { user, payload };
  }
}

@Injectable()
export class JwtStrategyGateway extends PassportStrategy(
  Strategy,
  'jwtgateway',
) {
  constructor(
    config: ConfigService,
    @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { name: string }) {
    const gateway = await this.gatewayModel
      .findOne({ name: payload.name })
      .select('-password');
    if (!gateway) throw new ForbiddenException('You must be logged in!');
    return { gateway };
  }
}
