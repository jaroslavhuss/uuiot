import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GatewaySchema,
  Gateway,
  HumiditySchema,
  Humidity,
  Temperature,
  TemperatureSchema,
} from 'src/schemas';
@Module({
  controllers: [GatewayController],
  providers: [GatewayService],
  imports: [
    MongooseModule.forFeature([
      { name: Gateway.name, schema: GatewaySchema },
      { name: Humidity.name, schema: HumiditySchema },
      { name: Temperature.name, schema: TemperatureSchema },
    ]),
  ],
})
export class GatewayModule {}
