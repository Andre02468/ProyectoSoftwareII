import { IsString, IsNotEmpty, IsNumber, IsPositive, IsBoolean } from 'class-validator';

export class RoomDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  hotelId: number;

  @IsNumber()
  @IsPositive()
  beds: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  available: boolean;
}
