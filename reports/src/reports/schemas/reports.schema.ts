import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Reports {
  @Prop({ required: true })
  hotelId: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  start: Date; 

  @Prop({ required: true })
  end: Date;  

  @Prop({ required: true, default: 'confirmed' })
  status: 'pending' | 'confirmed' | 'cancelled';
}

export type ReportsDocument = Reports & Document;
export const ReportsSchema = SchemaFactory.createForClass(Reports);

