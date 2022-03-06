import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { GatewaySaveDto, createGateWayDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GatewayService } from './gateway.service';
import { getUser } from 'src/auth/decorators';

@Controller('gateway')
export class GatewayController {
  constructor(private gateWayService: GatewayService) {}
  @Post('save')
  saveGateWayData(@Body() body: GatewaySaveDto) {
    console.log(body);
    return body;
  }

  @Post('create')
  @UseGuards(AuthGuard('jwtadmin'))
  async createGateWay(@Body() dto: createGateWayDto, @getUser() user: any) {
    dto.creator = user.user.name + ' ' + user.user.surname;
    const gateway = await this.gateWayService.createGateway(dto);
    return gateway;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllGateways() {
    const gateways = await this.gateWayService.getAllGateways();
    return gateways;
  }
}
