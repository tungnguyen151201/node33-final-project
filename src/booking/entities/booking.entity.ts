import { RoomEntity } from 'src/room/entities/room.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class BookingEnity {
  id: number;
  room: RoomEntity;
  user: UserEntity;
  checkInDate: Date;
  checkOutDate: Date;
  guestNumber: number;
}
