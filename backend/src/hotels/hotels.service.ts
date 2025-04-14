import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelDto } from './hotel.dto';

export interface Hotel {
  id: number;
  name: string;
  location: string;
  description?: string;
}

@Injectable()
export class HotelsService {
  private hotels: Hotel[] = [];
  private idCounter = 1;

  create(hotelDto: HotelDto): Hotel {
    const newHotel: Hotel = {
      id: this.idCounter++,
      ...hotelDto,
    };
    this.hotels.push(newHotel);
    return newHotel;
  }

  findAll(): Hotel[] {
    return this.hotels;
  }

  findById(id: number): Hotel {
    const hotel = this.hotels.find(h => h.id === id);
    if (!hotel) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
    return hotel;
  }

  update(id: number, hotelDto: HotelDto): Hotel {
    const hotel = this.findById(id);
    const updatedHotel = { ...hotel, ...hotelDto };
    this.hotels = this.hotels.map(h => (h.id === id ? updatedHotel : h));
    return updatedHotel;
  }

  remove(id: number): void {
    this.findById(id);
    this.hotels = this.hotels.filter(h => h.id !== id);
  }
}
