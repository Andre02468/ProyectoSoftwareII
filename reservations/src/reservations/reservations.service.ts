import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Reservation } from './entities/reservations.entity';
import { CreateReservationDto } from './reservations.dto';
import axios from 'axios';

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

  updateStatus(id: number, action: 'accepted' | 'rejected'): Reservation {
    const reservation = this.reservations.find(r => r.id === id);
    if (!reservation) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    if (reservation.status !== 'pending') {
      throw new BadRequestException(`Solo se puede gestionar una reserva pendiente`);
    }
  
    if (action === 'accepted') {
      reservation.status = 'confirmed';
    } else if (action === 'rejected') {
      reservation.status = 'cancelled';
    } else {
      throw new BadRequestException(`Acción no válida`);
    }
  
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

  async notifyReservationAccepted(clienteEmail: string) {
    try {
      const response = await axios.post('http://localhost:3000/notifications', {
        userEmail: clienteEmail, // email del cliente o del hotel
        type: 'reserva_aceptada',
        message: 'Tu reserva ha sido aceptada por el hotel.',
      });

      console.log('Notificación enviada con éxito:', response.data);
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  }
}

