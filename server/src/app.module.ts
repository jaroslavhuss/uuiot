import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './gateway/gateway.module';

//.env does not load here - but this string is no security harm
const STAGE: 'development' | 'production' = 'development';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<
          'DATABASE_LOCAL_URL' | 'DATABASE_PRODUCTION_URL'
        >(
          //Here u can change that - enum type is mentioned in STAGE variable btw.
          STAGE === 'development'
            ? 'DATABASE_LOCAL_URL'
            : 'DATABASE_PRODUCTION_URL',
        ),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GatewayModule,
  ],
})
export class AppModule {}
