import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './gateway/gateway.module';
import { AuditLogger } from './util/audit.logger';
import { AuditSchema, Audit } from './schemas/audit.schema';
import { JwtModule } from '@nestjs/jwt';
//.env does not load here - but this string is no security harm
const STAGE: 'development' | 'production' = 'production';

@Module({
  imports: [ 
    JwtModule.register({}),
    AuthModule,
    UserModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<
          'DATABASE_LOCAL_URL' | 'DATABASE_PRODUCTION_URL'
        >(
          //Here u can change that - enum type is mentioned in STAGE variable btw.
          //@ts-ignore
          STAGE === 'development'
            ? 'DATABASE_LOCAL_URL'
            : 'DATABASE_PRODUCTION_URL',
        ),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{name:Audit.name, schema:AuditSchema}]),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GatewayModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditLogger).forRoutes("*")
  }
}
