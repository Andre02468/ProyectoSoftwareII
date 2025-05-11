import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  hotelId: string;

  @Prop({ required: true })
  beds: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  type: string;

  @Prop({ default: true })
  available: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
