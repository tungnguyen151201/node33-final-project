import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  roomName: string;

  @IsNumber()
  @IsNotEmpty()
  guest: number;

  @IsNumber()
  @IsNotEmpty()
  bedroom: number;

  @IsNumber()
  @IsNotEmpty()
  bed: number;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  washingMachine: boolean;

  @IsNotEmpty()
  iron: boolean;

  @IsNotEmpty()
  television: boolean;

  @IsNotEmpty()
  airConditioner: boolean;

  @IsNotEmpty()
  wifi: boolean;

  @IsNotEmpty()
  stove: boolean;

  @IsNotEmpty()
  parkingLot: boolean;

  @IsNotEmpty()
  swimmingPool: boolean;

  image?: string;

  @IsNumber()
  @IsNotEmpty()
  locationId: number;
}
