import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true })
  hotelId: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  checkIn: Date;

  @Prop({ required: true })
  checkOut: Date;

  @Prop({ required: true, default: 'confirmed' })
  status: 'pending' | 'confirmed' | 'cancelled';
}

export type ReservationDocument = Reservation & Document;
export const ReservationSchema = SchemaFactory.createForClass(Reservation);