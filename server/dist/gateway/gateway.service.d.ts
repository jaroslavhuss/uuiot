/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Gateway, GatewayDocument, Humidity, HumidityDocument, Temperature, TemperatureDocument } from 'src/schemas';
import { Model } from 'mongoose';
import { createGateWayDto, GatewaySaveHumidityDto, GatewaySaveTemperatureDto } from './dto';
export declare class GatewayService {
    private gatewayModel;
    private humidityModel;
    private temperatureModel;
    constructor(gatewayModel: Model<GatewayDocument>, humidityModel: Model<HumidityDocument>, temperatureModel: Model<TemperatureDocument>);
    createGateway(dto: createGateWayDto): Promise<BadRequestException | (Gateway & import("mongoose").Document<any, any, any> & {
        _id: any;
    })>;
    getAllGateways(): Promise<(Gateway & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    deleteGateway(id: string): Promise<Gateway & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    saveHumidity(data: GatewaySaveHumidityDto): Promise<(Humidity & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[] | InternalServerErrorException>;
    saveTemperature(data: GatewaySaveTemperatureDto): Promise<InternalServerErrorException | (Temperature & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getHumidity(id: string, startDate: any, endDate: any): Promise<any[] | BadRequestException>;
    getTemperature(id: string, startDate: string, endDate: string): Promise<any[] | BadRequestException>;
}
