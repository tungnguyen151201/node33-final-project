import { IsNotEmpty, IsEmail } from 'class-validator';
import { Gender } from 'src/auth/enum/gender.enum';
import { UserRole } from 'src/auth/enum/user-role.enum';

export class CreateUserDto {
  /**
   * @example 'admin@gmail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @example '123456'
   */
  @IsNotEmpty()
  password: string;

  /**
   * @example 'Admin'
   */
  @IsNotEmpty()
  name: string;

  /**
   * @example '0123456789'
   */
  @IsNotEmpty()
  phone: string;

  /**
   * @example '01/10/2001'
   */
  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  role: UserRole;
}
