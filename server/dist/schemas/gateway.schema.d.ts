/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from 'mongoose';
export declare type GatewayDocument = Gateway & Document;
export declare class Gateway {
    createdAt: Date;
    name: string;
    password: string;
    description: string;
    creator: string;
}
export declare const GatewaySchema: import("mongoose").Schema<Document<Gateway, any, any>, import("mongoose").Model<Document<Gateway, any, any>, any, any, any>, any, any>;
