import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ValueDocument = Value & Document;

@Schema()
export class Value {
  @Prop()
  teplota: number;
  @Prop()
  vlhkost: number;
  @Prop()
  date: string;
  @Prop()
  gw: string;
}

export const ValueSchema = SchemaFactory.createForClass(Value);
