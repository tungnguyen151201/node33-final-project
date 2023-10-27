import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  email: string;

  @Exclude()
  password: string;

  name: string;
  phone: string;
  birthday: string;
  gender: string;
  role: string;
  avatar: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
