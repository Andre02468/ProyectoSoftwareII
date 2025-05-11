import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@NestSchema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true }) 
  email: string;

  @Prop({ type: [String], default: ['client'] })
  roles: string[];
  toObject: any;
}

export const UserSchema = SchemaFactory.createForClass(User);

