import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room, RoomSchema } from './schemas/rooms.schema';
import { HotelsModule } from '../hotels/hotels.module'; // Importa HotelsModule si no lo has hecho ya

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]), // Registra el modelo Room
    HotelsModule, // Asegúrate de que HotelsModule está importado si lo necesitas
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
