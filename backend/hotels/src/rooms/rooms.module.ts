import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Habitacion } from './entities/rooms.entity';
import { Hotel } from '../hotels/entities/hotels.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habitacion, Hotel]),
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}