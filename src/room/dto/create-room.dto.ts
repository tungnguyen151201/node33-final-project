import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

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

  @IsBoolean()
  @IsNotEmpty()
  washingMachine: boolean;

  @IsBoolean()
  @IsNotEmpty()
  iron: boolean;

  @IsBoolean()
  @IsNotEmpty()
  television: boolean;

  @IsBoolean()
  @IsNotEmpty()
  airConditioner: boolean;

  @IsBoolean()
  @IsNotEmpty()
  wifi: boolean;

  @IsBoolean()
  @IsNotEmpty()
  stove: boolean;

  @IsBoolean()
  @IsNotEmpty()
  parkingLot: boolean;

  @IsBoolean()
  @IsNotEmpty()
  swimmingPool: boolean;

  image?: string;

  @IsNumber()
  @IsNotEmpty()
  locationId: number;
}
