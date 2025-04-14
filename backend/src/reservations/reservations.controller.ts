import { Controller, Post, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './reservations.dto';
import { Reservation } from './entities/reservations.entity';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Reserva creada correctamente en estado pending' })
  create(@Body() createReservationDto: CreateReservationDto): Reservation {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Listado de todas las reservas' })
  findAll(): Reservation[] {
    return this.reservationService.findAll();
  }

  @Patch(':id/confirm')
  @ApiOkResponse({ description: 'Reserva confirmada correctamente' })
  @ApiNotFoundResponse({ description: 'Reserva no encontrada' })
  @ApiBadRequestResponse({ description: 'La reserva no se puede confirmar' })
  confirm(@Param('id', ParseIntPipe) id: number): Reservation {
    return this.reservationService.confirm(id);
  }

  @Patch(':id/cancel')
  @ApiOkResponse({ description: 'Reserva cancelada correctamente'})
  @ApiNotFoundResponse({ description: 'Reserva no encontrada' })
  @ApiBadRequestResponse({ description: 'La reserva no se puede cancelar' })
  cancel(@Param('id', ParseIntPipe) id: number): Reservation {
    return this.reservationService.cancel(id);
  }
}

