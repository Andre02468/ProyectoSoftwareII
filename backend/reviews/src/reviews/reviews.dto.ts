import { IsMongoId, IsString, IsNumber, Min, Max } from 'class-validator';

export class ReviewDto {
  @IsMongoId()
  reservationId: string;

  @IsMongoId()
  hotelId: string;

  @IsMongoId()
  userId: string;

  @IsString()
  comment: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
