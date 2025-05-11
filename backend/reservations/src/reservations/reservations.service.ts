import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservations.schema';
import { CreateReservationDto } from './reservations.dto';
import axios from 'axios';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const createdReservation = new this.reservationModel({
      ...createReservationDto,
      startDate: new Date(createReservationDto.startDate),
      endDate: new Date(createReservationDto.endDate),
      status: 'pending',
    });

    return createdReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }

  async updateStatus(id: string, action: 'accepted' | 'rejected'): Promise<Reservation> {
    const reservation = await this.reservationModel.findOne({ _id: id });

    if (!reservation) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }

    if (reservation.status !== 'pending') {
      throw new BadRequestException(`Solo se puede gestionar una reserva pendiente`);
    }

    if (action === 'accepted') {
      reservation.status = 'accepted'; // 🔧 CORREGIDO
    } else if (action === 'rejected') {
      reservation.status = 'cancelled';
    } else {
      throw new BadRequestException(`Acción no válida`);
    }

    return reservation.save();
  }

  async cancel(id: string): Promise<Reservation> {
    const reservation = await this.reservationModel.findOne({ _id: id });

    if (!reservation) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }

    if (reservation.status === 'cancelled') {
      throw new BadRequestException(`La reserva ya se encuentra cancelada`);
    }

    reservation.status = 'cancelled';
    return reservation.save();
  }

  async notifyReservationAccepted(clienteEmail: string) {
    try {
      const response = await axios.post('http://localhost:3000/notifications', {
        userEmail: clienteEmail,
        type: 'reserva_aceptada',
        message: 'Tu reserva ha sido aceptada por el hotel.',
      });

      console.log('Notificación enviada con éxito:', response.data);
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  }
}
