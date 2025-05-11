import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  
import { ReservationController } from './reservations.controller';
import { ReservationService } from './reservations.service';
import { Reservation, ReservationSchema } from './schemas/reservations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },  
    ]),
  ],
  controllers: [ReservationController],  
  providers: [ReservationService],  
})
export class ReservationsModule {}
