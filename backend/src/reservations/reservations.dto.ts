import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  hotelId: number;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
