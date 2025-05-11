import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
