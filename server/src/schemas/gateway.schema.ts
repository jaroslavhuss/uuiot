import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GatewayDocument = Gateway & Document;

@Schema()
export class Gateway {
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop()
  gatewayName: string;
  @Prop()
  temp: number;
  @Prop()
  hum: number;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
