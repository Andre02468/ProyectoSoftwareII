import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserDto } from './users.dto';
import { User } from './entities/users.entity'; // Asegúrate que la ruta es correcta

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  findOne(
    @Param('id', ParseIntPipe) id: number // Convertimos a number aquí
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  update(
    @Param('id', ParseIntPipe) id: number, // Convertimos a number aquí
    @Body() userDto: UserDto
  ): Promise<User> {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  remove(
    @Param('id', ParseIntPipe) id: number // Convertimos a number aquí
  ): Promise<void> {
    return this.usersService.remove(id);
  }
}
