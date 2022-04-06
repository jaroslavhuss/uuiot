/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    name: string;
    surname: string;
    authLevel: string;
    isUserApproved: boolean;
    lastLoggedIn: Date;
    refresh_token: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any, any>;
