import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true })
  hotelId: string;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  clientEmail: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
