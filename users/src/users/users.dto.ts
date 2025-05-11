import { IsString, IsNotEmpty, IsOptional, IsArray, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail() 
  email: string;

  @IsOptional()
  @IsArray()
  roles?: string[];
}
