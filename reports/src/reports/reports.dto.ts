import { IsDateString, IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  readonly hotelId: string;

  @IsDateString()
  readonly start: string;

  @IsDateString()
  readonly end: string;
}