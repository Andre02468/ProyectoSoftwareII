import {Controller,Post,Get,Patch,Param,Body,UseGuards} from '@nestjs/common';
import {ApiTags,ApiCreatedResponse,ApiOkResponse,ApiNotFoundResponse,ApiBadRequestResponse} from '@nestjs/swagger';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './reservations.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Reserva creada correctamente en estado pending' })
  async create(@Body() createReservationDto: CreateReservationDto) {
    return await this.reservationService.create(createReservationDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Listado de todas las reservas' })
  async findAll() {
    return await this.reservationService.findAll();
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ description: 'Estado de la reserva actualizado correctamente' })
  @ApiNotFoundResponse({ description: 'Reserva no encontrada' })
  @ApiBadRequestResponse({ description: 'Acción no válida o reserva no en estado pending' })
  async updateStatus(
    @Param('id') id: string, // usamos string porque es ObjectId
    @Body('action') action: 'accepted' | 'rejected'
  ) {
    return await this.reservationService.updateStatus(id, action);
  }

  @Patch(':id/cancel')
  @ApiOkResponse({ description: 'Reserva cancelada correctamente' })
  @ApiNotFoundResponse({ description: 'Reserva no encontrada' })
  async cancelReservation(@Param('id') id: string) {
    return await this.reservationService.cancel(id);
  }

  @Post('accept')
  async acceptReservation(@Body() reservationData: { clienteEmail: string }) {
    await this.reservationService.notifyReservationAccepted(reservationData.clienteEmail);
    return { message: 'Reserva aceptada y notificación enviada.' };
  }
}
