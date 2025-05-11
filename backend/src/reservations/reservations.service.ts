import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Reservation } from './entities/reservations.entity';
import { CreateReservationDto } from './reservations.dto';

@Injectable()
export class ReservationService {
  private reservations: Reservation[] = [];
  private idCounter = 1;

  create(createReservationDto: CreateReservationDto): Reservation {
    const { userId, hotelId, roomId, startDate, endDate } = createReservationDto;

    const newReservation: Reservation = {
      id: this.idCounter++,
      userId,
      hotelId,
      roomId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.reservations.push(newReservation);

    return newReservation;
  }

  findAll(): Reservation[] {
    return this.reservations;
  }

  confirm(id: number): Reservation {
    const reservation = this.reservations.find(r => r.id === id);
    if (!reservation) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    if (reservation.status !== 'pending') {
      throw new BadRequestException(`Solo se puede confirmar una reserva pendiente`);
    }
    reservation.status = 'confirmed';
    reservation.updatedAt = new Date();
    return reservation;
  }
  
  cancel(id: number): Reservation {
    const reservation = this.reservations.find(r => r.id === id);
    if (!reservation) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    if (reservation.status === 'cancelled') {
      throw new BadRequestException(`La reserva ya se encuentra cancelada`);
    }
    reservation.status = 'cancelled';
    reservation.updatedAt = new Date();
    return reservation;
  }
}

