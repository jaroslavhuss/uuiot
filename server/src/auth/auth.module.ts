import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  JwtStrategy,
  JwtStrategyAdmin,
  JwtStrategyGateway,
  RefreshTokenStrategy,
} from './strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/schemas/user.schema';
import { GatewaySchema, Gateway } from 'src/schemas';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Gateway.name, schema: GatewaySchema },
    ]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtStrategyAdmin,
    JwtStrategyGateway,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
