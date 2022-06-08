import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditDocument } from 'src/schemas/audit.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuditLogger implements NestMiddleware {
    private auditModel;
    private jwt;
    constructor(auditModel: Model<AuditDocument>, jwt: JwtService);
    private logger;
    use(request: Request, response: Response, next: NextFunction): void;
}
