import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelDto } from './hotel.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo hotel' })
  @ApiResponse({ status: 201, description: 'Hotel creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  create(@Body() hotelDto: HotelDto) {
    return this.hotelsService.create(hotelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los hoteles' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de hoteles obtenida correctamente',
    type: [HotelDto]
  })
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un hotel por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del hotel' })
  @ApiResponse({ status: 200, description: 'Hotel encontrado', type: HotelDto })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hotelsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un hotel existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del hotel a actualizar' })
  @ApiResponse({ status: 200, description: 'Hotel actualizado', type: HotelDto })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() hotelDto: HotelDto
  ) {
    return this.hotelsService.update(id, hotelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un hotel' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del hotel a eliminar' })
  @ApiResponse({ status: 200, description: 'Hotel eliminado' })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.hotelsService.remove(id);
    return { message: `Hotel con id ${id} eliminado exitosamente` };
  }
}