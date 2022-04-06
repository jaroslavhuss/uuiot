/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose" />
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
    createGateWay(dto: createGateWayDto, user: any): Promise<import("@nestjs/common").BadRequestException | (import("../schemas").Gateway & import("mongoose").Document<any, any, any> & {
        _id: any;
    })>;
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
    }): Promise<import("@nestjs/common").BadRequestException | (import("../schemas").Humidity & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getGateWayTemperatureData(body: {
        id: string;
        startDate: string;
        endDate: string;
    }): Promise<import("@nestjs/common").BadRequestException | (import("../schemas").Temperature & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
