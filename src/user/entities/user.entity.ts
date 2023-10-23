import { UserRole } from 'src/auth/enum/user-role.enum';

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  birthday: string;
  gender: string;
  role: UserRole;
}
