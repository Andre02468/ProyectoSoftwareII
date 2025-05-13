import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotels.entities';
import { HotelDto } from './hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async create(hotelDto: HotelDto): Promise<Hotel> {
    const hotel = this.hotelRepository.create(hotelDto);
    return this.hotelRepository.save(hotel);
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelRepository.find({ relations: ['habitaciones'] });
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOne({ 
      where: { id },
      relations: ['habitaciones']
    });
    
    if (!hotel) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
    
    return hotel;
  }

  async update(id: number, hotelDto: HotelDto): Promise<Hotel> {
    await this.hotelRepository.update(id, hotelDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.hotelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
  }
}