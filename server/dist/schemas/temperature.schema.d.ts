/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from 'mongoose';
export declare type TemperatureDocument = Temperature & Document;
export declare class Temperature {
    temperature: number;
    wasSent: boolean;
    date: string;
    gw: string;
}
export declare const TemperatureSchema: import("mongoose").Schema<Document<Temperature, any, any>, import("mongoose").Model<Document<Temperature, any, any>, any, any, any>, any, any>;
