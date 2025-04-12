import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelDto } from './hotel.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @ApiOperation({ summary: 'Crear un nuevo hotel' })
  @Post()
  create(@Body() hotelDto: HotelDto) {
    return this.hotelsService.create(hotelDto);
  }

  @ApiOperation({ summary: 'Obtener todos los hoteles' })
  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un hotel por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Actualizar un hotel por ID' })
  @Put(':id')
  update(@Param('id') id: string, @Body() hotelDto: HotelDto) {
    return this.hotelsService.update(Number(id), hotelDto);
  }

  @ApiOperation({ summary: 'Eliminar un hotel' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.hotelsService.remove(Number(id));
    return { message: `Hotel con id ${id} eliminado exitosamente` };
  }
}
