import { LocationEntity } from 'src/location/entities/location.entity';

export class RoomEntity {
  id: number;
  roomName: string;
  guest: number;
  bedroom: number;
  bed: number;
  description: string;
  price: number;
  washingMachine: boolean;
  iron: boolean;
  television: boolean;
  airConditioner: boolean;
  wifi: boolean;
  stove: boolean;
  parkingLot: boolean;
  swimmingPool: boolean;
  image: string;
  location: LocationEntity;

  constructor(partial: Partial<RoomEntity>) {
    Object.assign(this, partial);
  }
}
