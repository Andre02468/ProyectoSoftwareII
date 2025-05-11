import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserDto } from './users.dto';
import { User } from './schemas/users.schema'; 

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
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);  
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
  update(@Param('id') id: string, @Body() userDto: UserDto): Promise<User> {
    return this.usersService.update(id, userDto); 
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id); 
  }
}
