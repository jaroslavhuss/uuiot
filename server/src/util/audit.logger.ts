import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import {Audit, AuditDocument} from 'src/schemas/audit.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuditLogger implements NestMiddleware {
    constructor(@InjectModel(Audit.name) private auditModel:Model<AuditDocument>, private jwt:JwtService){}
  
    private logger = new Logger('AUDIT');
   
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, params, body} = request;
    const userAgent = request.get('user-agent') || '';
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      if(body.hasOwnProperty("password")){
          body.password = null
      }
      this.auditModel.create({
          method,
          originalUrl,
          statusCode, 
          contentLength, 
          userAgent,
          ip,
          params:JSON.stringify(params),
          body:JSON.stringify(body),
          user:JSON.stringify(this.jwt.decode(request.headers.authorization.split(" ")[1]))
      })
   
    });

    next();
  }
}