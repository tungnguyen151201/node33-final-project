import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsDateString()
  @IsNotEmpty()
  reviewDate: Date;

  @IsNumber()
  @IsNotEmpty()
  star: number;

  detail?: string;
}
