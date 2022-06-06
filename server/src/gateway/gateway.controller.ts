import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {
  createGateWayDto,
  GatewaySaveHumidityDto,
  GatewaySaveTemperatureDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GatewayService } from './gateway.service';
import { getUser } from '../auth/decorators';
import { getGateway } from './decorators';
@Controller('gateway')
export class GatewayController {
  constructor(private gateWayService: GatewayService) {}

  @Post('save/humidity')
  @UseGuards(AuthGuard('jwtgateway'))
  saveHumidity(
    @Body() body: GatewaySaveHumidityDto[],
    @getGateway() gateway: any,
  ) {
    const humidityArray: any = body.map((h) => {
      h.gw = gateway;
      return h;
    });
    return this.gateWayService.saveHumidity(humidityArray);
  }

  @Post('save/temperature')
  @UseGuards(AuthGuard('jwtgateway'))
  saveTemperature(
    @Body() body: GatewaySaveTemperatureDto[],
    @getGateway() gateway: any,
  ) {
    const temperatureArray: any = body.map((h) => {
      h.gw = gateway;
      return h;
    });
    return this.gateWayService.saveTemperature(temperatureArray);
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
  @Post('data/humidity/')
  async getGateWayHumidityData(
    @Body() body: { id: string; startDate: string; endDate: string },
  ) {
    const sDate: string = new Date(body.startDate).toISOString().split('T')[0];
    const eDate: string = new Date(body.endDate).toISOString().split('T')[0];
    if (sDate > eDate) throw new BadRequestException('Bad date range');
    const data = await this.gateWayService.getHumidity(body.id, sDate, eDate);
    return data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('data/temperature/')
  async getGateWayTemperatureData(
    @Body() body: { id: string; startDate: string; endDate: string },
  ) {
    const sDate: string = new Date(body.startDate).toISOString().split('T')[0];
    const eDate: string = new Date(body.endDate).toISOString().split('T')[0];
    if (sDate > eDate) throw new BadRequestException('Bad date range');
    const data = await this.gateWayService.getTemperature(
      body.id,
      sDate,
      eDate,
    );
    return data;
  }
}
