import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  roomName: string;

  @IsNotEmpty()
  guest: number;

  @IsNotEmpty()
  bedroom: number;

  @IsNotEmpty()
  bed: number;

  @IsNotEmpty()
  description: string;

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

  @IsNotEmpty()
  locationId: number;
}
