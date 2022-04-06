/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from 'mongoose';
export declare type HumidityDocument = Humidity & Document;
export declare class Humidity {
    humidity: number;
    wasSent: boolean;
    date: string;
    gw: string;
}
export declare const HumiditySchema: import("mongoose").Schema<Document<Humidity, any, any>, import("mongoose").Model<Document<Humidity, any, any>, any, any, any>, any, any>;
