import { IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsDateString()
  @IsNotEmpty()
  checkInDate: Date;

  @IsDateString()
  @IsNotEmpty()
  checkOutDate: Date;

  @IsNumber()
  @IsNotEmpty()
  guestNumber: number;
}
