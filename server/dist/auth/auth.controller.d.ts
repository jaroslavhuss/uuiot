/// <reference types="node" />
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto, UserIdDto } from './dto';
import { GatewayLogInDto } from '../gateway/dto';
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
