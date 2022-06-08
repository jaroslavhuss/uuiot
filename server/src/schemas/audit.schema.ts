import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditDocument = Audit & Document;
@Schema()
export class Audit {
  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop()
  method: string;

  @Prop()
  originalUrl: string;

  @Prop()
  statusCode: number;

  @Prop()
  contentLength: string;

  @Prop()
  userAgent:string;
  
  @Prop()
  ip:string

  @Prop()
  params:string

  @Prop()
  body:string
  
  @Prop()
  user:string
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
