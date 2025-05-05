import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelDocument, Hotel as HotelModel, HotelSchema } from './schemas/hotels.schema';
import { HotelDto } from './hotel.dto';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel('Hotel') private hotelModel: Model<HotelDocument>,
  ){}

  async create(hotelDto: HotelDto): Promise<Hotel> {
    const nuevoHotel = new this.hotelModel(hotelDto);
    const hotelGuardado = await nuevoHotel.save();
    return this.mapToHotelInterface(hotelGuardado);
  }

  async findAll(): Promise<Hotel[]> {
    const hoteles = await this.hotelModel.find().lean().exec();
    return hoteles.map(this.mapToHotelInterface);
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id).lean().exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
    return this.mapToHotelInterface(hotel);
  }

  async update(id: string, hotelDto: HotelDto): Promise<Hotel> {
    const hotelActualizado = await this.hotelModel
      .findByIdAndUpdate(id, hotelDto, { new: true })
      .lean()
      .exec();

    if (!hotelActualizado) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }

    return this.mapToHotelInterface(hotelActualizado);
  }

  async remove(id: string): Promise<void> {
    const hotel = await this.hotelModel.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
    await this.hotelModel.findByIdAndDelete(id).exec();
  }

  private mapToHotelInterface(doc: any): Hotel {
    return {
      id: doc._id?.toString() || doc.id,
      name: doc.name,
      location: doc.location,
      description: doc.description,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
