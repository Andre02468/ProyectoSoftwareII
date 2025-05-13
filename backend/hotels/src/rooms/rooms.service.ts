import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from './entities/rooms.entity';
import { RoomDto } from './rooms.dto';
import { Hotel } from '../hotels/entities/hotels.entities';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Habitacion)
    private roomRepository: Repository<Habitacion>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async create(roomDto: RoomDto): Promise<Habitacion> {
    const hotel = await this.hotelRepository.findOne({ 
      where: { id: roomDto.hotelId }
    });
    
    if (!hotel) {
      throw new NotFoundException(`No existe un hotel con id ${roomDto.hotelId}`);
    }

    const room = this.roomRepository.create({
      ...roomDto,
      hotel
    });

    return this.roomRepository.save(room);
  }

  async findAll(): Promise<Habitacion[]> {
    return this.roomRepository.find({ relations: ['hotel'] });
  }

  async findByHotel(hotelId: number): Promise<Habitacion[]> {
    return this.roomRepository.find({ 
      where: { hotel: { id: hotelId } },
      relations: ['hotel']
    });
  }

  async findOne(id: number): Promise<Habitacion> {
    const room = await this.roomRepository.findOne({ 
      where: { id },
      relations: ['hotel']
    });
    
    if (!room) {
      throw new NotFoundException(`Habitación con id ${id} no encontrada`);
    }
    
    return room;
  }

  async update(id: number, roomDto: RoomDto): Promise<Habitacion> {
    const room = await this.findOne(id);
    const hotel = await this.hotelRepository.findOne({ 
      where: { id: roomDto.hotelId }
    });

    if (!hotel) {
      throw new NotFoundException(`No existe un hotel con id ${roomDto.hotelId}`);
    }

    await this.roomRepository.update(id, {
      ...roomDto,
      hotel
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Habitación con id ${id} no encontrada`);
    }
  }
}