import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class HotelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;
}
