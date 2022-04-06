/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from 'mongoose';
export declare type ValueDocument = Value & Document;
export declare class Value {
    teplota: number;
    vlhkost: number;
    date: string;
    gw: string;
}
export declare const ValueSchema: import("mongoose").Schema<Document<Value, any, any>, import("mongoose").Model<Document<Value, any, any>, any, any, any>, any, any>;
