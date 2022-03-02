import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: new Date() })
  updatedAt: Date;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop({ default: 'iotuser' })
  authLevel: string;
  @Prop()
  isUserApproved: boolean;
  @Prop({ default: new Date() })
  lastLoggedIn: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
