import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'usuario123', description: 'Nombre de usuario' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'usuario@email.com', description: 'Correo electrónico' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: ['user'], description: 'Roles del usuario', required: false })
  @IsOptional()
  roles?: string[];
}