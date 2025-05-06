import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegisterDocument = Register & Document;

@Schema({ timestamps: true }) 
export class Register {
  @Prop({ required: true }) 
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true }) 
  email: string;

  @Prop({ type: [String], default: [] }) 
  roles: string[];
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
