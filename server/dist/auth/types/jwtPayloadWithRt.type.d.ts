import { JwtPayload } from './jwtPayload.type';
export declare type JwtPayloadWithRt = JwtPayload & {
    refreshToken: string;
};
