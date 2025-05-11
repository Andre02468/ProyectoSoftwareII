import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomDto } from './rooms.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport'; // Importa el guard de autenticación
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  //@Roles('admin')
  @Post()
  create(@Body() roomDto: RoomDto) {
    return this.roomsService.create(roomDto);
  }
  

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get('hotel/:hotelId')
  findByHotel(@Param('hotelId') hotelId: string) {
    return this.roomsService.findByHotel(hotelId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(Number(id));
  }

  //@UseGuards(AuthGuard('jwt'), RolesGuard) // Usa el guard para proteger esta ruta
  //@Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() roomDto: RoomDto) {
    return this.roomsService.update(Number(id), roomDto);
  }

  //@UseGuards(AuthGuard('jwt'),RolesGuard) // Usa el guard para proteger esta ruta
  //@Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(Number(id));
  }
}
