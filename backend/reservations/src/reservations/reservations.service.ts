import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './reservations.dto';
import axios from 'axios';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      date: new Date(createReservationDto.date),
      status: 'pending',
    });
    return this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async updateStatus(id: number, action: 'accepted' | 'rejected'): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({ where: { id } });

    if (!reservation) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }

    if (reservation.status !== 'pending') {
      throw new BadRequestException(`Solo se puede gestionar una reserva pendiente`);
    }

    reservation.status = action === 'accepted' ? 'accepted' : 'cancelled';
    return this.reservationRepository.save(reservation);
  }

  async cancel(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({ where: { id } });

    if (!reservation) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }

    if (reservation.status === 'cancelled') {
      throw new BadRequestException(`La reserva ya se encuentra cancelada`);
    }

    reservation.status = 'cancelled';
    return this.reservationRepository.save(reservation);
  }

  async notifyReservationAccepted(clientEmail: string) {
    try {
      const response = await axios.post('http://notifications:3004/notifications', {
        userEmail: clientEmail,
        type: 'reserva_aceptada',
        message: 'Tu reserva ha sido aceptada por el hotel.',
      });
      console.log('Notificación enviada con éxito:', response.data);
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  }
}