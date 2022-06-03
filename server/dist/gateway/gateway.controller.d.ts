import { BadRequestException } from '@nestjs/common';
import { createGateWayDto, GatewaySaveHumidityDto, GatewaySaveTemperatureDto } from './dto';
import { GatewayService } from './gateway.service';
export declare class GatewayController {
    private gateWayService;
    constructor(gateWayService: GatewayService);
    saveHumidity(body: GatewaySaveHumidityDto[], gateway: any): Promise<(import("../schemas").Humidity & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[] | import("@nestjs/common").InternalServerErrorException>;
    saveTemperature(body: GatewaySaveTemperatureDto[], gateway: any): Promise<import("@nestjs/common").InternalServerErrorException | (import("../schemas").Temperature & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    createGateWay(dto: createGateWayDto, user: any): Promise<(import("../schemas").Gateway & import("mongoose").Document<any, any, any> & {
        _id: any;
    }) | BadRequestException>;
    getAllGateways(): Promise<(import("../schemas").Gateway & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    deleteGateway(id: string): Promise<import("../schemas").Gateway & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getGateWayHumidityData(body: {
        id: string;
        startDate: string;
        endDate: string;
    }): Promise<any[] | BadRequestException>;
    getGateWayTemperatureData(body: {
        id: string;
        startDate: string;
        endDate: string;
    }): Promise<any[] | BadRequestException>;
}
