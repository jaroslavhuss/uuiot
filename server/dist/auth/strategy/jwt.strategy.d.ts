import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Gateway, GatewayDocument } from 'src/schemas';
import { Model } from 'mongoose';
interface payLoadInterface {
    sub: number;
    email: string;
    authLevel: string;
    iat: number;
    exp: number;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(config: ConfigService, userModel: Model<UserDocument>);
    validate(payload: any): Promise<{
        user: User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        payload: any;
    }>;
}
declare const JwtStrategyAdmin_base: new (...args: any[]) => Strategy;
export declare class JwtStrategyAdmin extends JwtStrategyAdmin_base {
    private userModel;
    constructor(config: ConfigService, userModel: Model<UserDocument>);
    validate(payload: payLoadInterface): Promise<{
        user: User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        payload: payLoadInterface;
    }>;
}
declare const JwtStrategyGateway_base: new (...args: any[]) => Strategy;
export declare class JwtStrategyGateway extends JwtStrategyGateway_base {
    private gatewayModel;
    constructor(config: ConfigService, gatewayModel: Model<GatewayDocument>);
    validate(payload: {
        name: string;
    }): Promise<{
        gateway: Gateway & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
}
export {};
