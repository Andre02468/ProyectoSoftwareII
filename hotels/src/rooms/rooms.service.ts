import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDto } from './rooms.dto';
import { HotelsService } from '../hotels/hotels.service';
import { Room, RoomDocument } from './schemas/rooms.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>, 
    private readonly hotelsService: HotelsService,
  ) {}

  // Crear una nueva habitación
  async create(roomDto: RoomDto): Promise<Room> {
    const hotelExists = await this.hotelsService.findOne(roomDto.hotelId);
    if (!hotelExists) {
      throw new NotFoundException(`No existe un hotel con id ${roomDto.hotelId}`);
    }

    // Crear la habitación y guardarla en la base de datos
    const newRoom = new this.roomModel({
      ...roomDto,
      hotelId: roomDto.hotelId, // Asegurarse de que el hotelId sea del tipo correcto
    });

    return await newRoom.save();
  }

  // Obtener todas las habitaciones
  async findAll(): Promise<Room[]> {
    return await this.roomModel.find().exec();
  }

  // Obtener habitaciones de un hotel específico
  async findByHotel(hotelId: string): Promise<Room[]> {
    return await this.roomModel.find({ hotelId }).exec();
  }

  // Buscar una habitación por id
  async findOne(id: number): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
    if (!room) throw new NotFoundException(`Habitación con id ${id} no encontrada`);
    return room;
  }

  // Actualizar una habitación existente
async update(id: number, roomDto: RoomDto): Promise<Room> {
  const existingRoom = await this.findOne(id);

  if (roomDto.hotelId !== existingRoom.hotelId) {
    const hotelExists = await this.hotelsService.findOne(roomDto.hotelId);
    if (!hotelExists) {
      throw new NotFoundException(`No existe un hotel con id ${roomDto.hotelId}`);
    }
  }

  const updatedRoom = await this.roomModel.findByIdAndUpdate(id, roomDto, { new: true }).exec();

  if (!updatedRoom) {
    throw new NotFoundException(`Habitación con id ${id} no encontrada para actualizar`);
  }

  return updatedRoom;
}


  // Eliminar una habitación
  async remove(id: number): Promise<void> {
    const room = await this.findOne(id);
    if (!room) throw new NotFoundException(`Habitación con id ${id} no encontrada`);
    await this.roomModel.findByIdAndDelete(id).exec();
  }
}
