import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HumidityDocument = Humidity & Document;

@Schema()
export class Humidity {
  @Prop()
  humidity: number;
  @Prop()
  wasSent: boolean;
  @Prop()
  date: string;
  @Prop()
  gw: string;
}

export const HumiditySchema = SchemaFactory.createForClass(Humidity);
