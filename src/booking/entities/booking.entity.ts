import { RoomEntity } from 'src/room/entities/room.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class BookingEntity {
  id: number;
  room: RoomEntity;
  user: UserEntity;
  checkInDate: Date;
  checkOutDate: Date;
  guestNumber: number;

  constructor(partial: Partial<BookingEntity>) {
    Object.assign(this, partial);
  }
}
