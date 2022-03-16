import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaySchema, Gateway, ValueSchema, Value } from 'src/schemas';
@Module({
  controllers: [GatewayController],
  providers: [GatewayService],
  imports: [
    MongooseModule.forFeature([
      { name: Gateway.name, schema: GatewaySchema },
      { name: Value.name, schema: ValueSchema },
    ]),
  ],
})
export class GatewayModule {}
