import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './entities/rooms.entity';
import { RoomDto } from './rooms.dto';
import { HotelsService } from '../hotels/hotels.service';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  private idCounter = 1;

  constructor(private readonly hotelsService: HotelsService) {}

  create(roomDto: RoomDto): Room {
    const hotelExists = this.hotelsService.findById(roomDto.hotelId);
    if (!hotelExists) {
      throw new NotFoundException(`No existe un hotel con id ${roomDto.hotelId}`);
    }

    const newRoom: Room = {
      id: this.idCounter++,
      ...roomDto,
    };

    this.rooms.push(newRoom);
    return newRoom;
  }

  findAll(): Room[] {
    return this.rooms;
  }

  findByHotel(hotelId: number): Room[] {
    return this.rooms.filter(room => room.hotelId === hotelId);
  }

  findOne(id: number): Room {
    const room = this.rooms.find(r => r.id === id);
    if (!room) throw new NotFoundException(`Habitación con id ${id} no encontrada`);
    return room;
  }

  update(id: number, roomDto: RoomDto): Room {
    const existingRoom = this.findOne(id);

    if (roomDto.hotelId !== existingRoom.hotelId) {
      const hotelExists = this.hotelsService.findById(roomDto.hotelId);
      if (!hotelExists) {
        throw new NotFoundException(`No existe un hotel con id ${roomDto.hotelId}`);
      }
    }

    const updatedRoom: Room = { ...existingRoom, ...roomDto };
    this.rooms = this.rooms.map(r => (r.id === id ? updatedRoom : r));
    return updatedRoom;
  }

  remove(id: number): void {
    this.findOne(id); 
    this.rooms = this.rooms.filter(r => r.id !== id);
  }
}
