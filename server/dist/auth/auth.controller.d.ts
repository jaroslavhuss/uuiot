/// <reference types="node" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose" />
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto, UserIdDto } from './dto';
import { GatewayLogInDto } from 'src/gateway/dto';
import { Tokens } from './types';
import { ok } from 'assert';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignUpDto): Promise<Tokens>;
    signin(dto: AuthDto): Promise<any>;
    logout(dto: UserIdDto): Promise<import("../schemas").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    refreshTokens(req: {
        user: {
            sub: string;
        };
    }): typeof ok;
    gatewaySignIn(dto: GatewayLogInDto): Promise<any>;
    justatest(): string;
}
