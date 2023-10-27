import { RoomEntity } from 'src/room/entities/room.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class ReviewEntity {
  id: number;
  room: RoomEntity;
  user: UserEntity;
  reviewDate: Date;
  star: number;
  detail: string;

  constructor(partial: Partial<ReviewEntity>) {
    Object.assign(this, partial);
  }
}
