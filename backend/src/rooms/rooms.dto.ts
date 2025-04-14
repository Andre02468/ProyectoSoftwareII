import { IsString, IsNotEmpty, IsNumber, IsPositive, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  hotelId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  beds: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsBoolean()
  available: boolean;
}
