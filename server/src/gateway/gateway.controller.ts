import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { createGateWayDto, GatewaySaveHumidityDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GatewayService } from './gateway.service';
import { getUser } from 'src/auth/decorators';
import { getGateway } from './decorators';
@Controller('gateway')
export class GatewayController {
  constructor(private gateWayService: GatewayService) {}

  @Post('save/humidity')
  @UseGuards(AuthGuard('jwtgateway'))
  saveGateWayData(
    @Body() body: GatewaySaveHumidityDto[],
    @getGateway() gateway: any,
  ) {
    const humidityArray: any = body.map((h) => {
      h.gw = gateway;
      return h;
    });
    return this.gateWayService.saveHumidity(humidityArray);
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

  @UseGuards(AuthGuard('jwtadmin'))
  @Delete('delete/:id')
  async deleteGateway(@Param('id') id: string) {
    const user = await this.gateWayService.deleteGateway(id);
    return user;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('data/:id')
  async getGatewayData(@Param('id') id: string) {
    // const data = await this.gateWayService.getGatewayData(id);
    return 'ok';
  }
}
