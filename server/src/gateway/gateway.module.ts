import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaySchema, Gateway } from 'src/schemas';
@Module({
  controllers: [GatewayController],
  providers: [GatewayService],
  imports: [
    MongooseModule.forFeature([{ name: Gateway.name, schema: GatewaySchema }]),
  ],
})
export class GatewayModule {}
