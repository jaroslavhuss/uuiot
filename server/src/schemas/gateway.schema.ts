import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GatewayDocument = Gateway & Document;

@Schema()
export class Gateway {
  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  description: string;

  @Prop()
  creator: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
