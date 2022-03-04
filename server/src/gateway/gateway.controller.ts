import { Body, Controller, Post } from '@nestjs/common';
import { Gateway } from 'src/schemas/gateway.schema';

@Controller('gateway')
export class GatewayController {
  @Post('save')
  saveGateWayData(@Body() body: Gateway) {
    return body;
  }
}
