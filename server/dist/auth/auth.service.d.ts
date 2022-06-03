/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
import { AuthDto, SignUpDto, UserIdDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from 'mongoose';
import { GatewayLogInDto } from '../gateway/dto';
import { GatewayDocument } from '../schemas';
import { Tokens } from './types';
export declare class AuthService {
    private jwt;
    private userModel;
    private gatewayModel;
    constructor(jwt: JwtService, userModel: Model<UserDocument>, gatewayModel: Model<GatewayDocument>);
    signup(dto: SignUpDto): Promise<Tokens>;
    signin(dto: AuthDto): Promise<any>;
    logout(id: UserIdDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    signToken(userId: number, email: string, authLevel: string): Promise<Tokens>;
    updateRefreshToken(userId: string, refresh_token: string): Promise<void>;
    gatewaySignIn(dto: GatewayLogInDto): Promise<any>;
    gatewaySignToken(name: string): Promise<any>;
}
