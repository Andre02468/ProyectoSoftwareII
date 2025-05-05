import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './reservations.dto';
import { Reservation } from './entities/reservations.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

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

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ description: 'Estado de la reserva actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Reserva no encontrada' })
  @ApiBadRequestResponse({ description: 'Acción no válida o reserva no en estado pending' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('action') action: 'accepted' | 'rejected'
  ): Reservation {
    return this.reservationService.updateStatus(id, action);
  }
  @Post('accept')
  async acceptReservation(@Body() reservationData: any) {
    // Aceptar la reserva (lógica específica de tu aplicación)
    await this.reservationService.notifyReservationAccepted(reservationData.clienteEmail);
    return { message: 'Reserva aceptada y notificación enviada.' };
  }
}
