import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './gateway/gateway.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/uuiot'),
    ConfigModule.forRoot({ isGlobal: true }),
    GatewayModule,
  ],
})
export class AppModule {}
