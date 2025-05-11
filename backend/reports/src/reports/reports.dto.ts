import { IsDateString, IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  readonly hotelId: string;

  @IsString()
  readonly roomId: string;

  @IsDateString()
  readonly start: string;

  @IsDateString()
  readonly end: string;

  @IsString()
  readonly status: 'pending' | 'confirmed' | 'cancelled';
}
