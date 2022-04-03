import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemperatureDocument = Temperature & Document;

@Schema()
export class Temperature {
  @Prop()
  temperature: number;
  @Prop()
  wasSent: boolean;
  @Prop()
  date: string;
  @Prop()
  gw: string;
}

export const TemperatureSchema = SchemaFactory.createForClass(Temperature);
