/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from 'mongoose';
export declare type AuditDocument = Audit & Document;
export declare class Audit {
    createdAt: Date;
    method: string;
    originalUrl: string;
    statusCode: number;
    contentLength: string;
    userAgent: string;
    ip: string;
    params: string;
    body: string;
    user: string;
}
export declare const AuditSchema: import("mongoose").Schema<Document<Audit, any, any>, import("mongoose").Model<Document<Audit, any, any>, any, any, any>, any, any>;
