import { IsEmail, ValidateIf } from 'class-validator';
import { Gender } from 'src/auth/enum/gender.enum';
import { UserRole } from 'src/auth/enum/user-role.enum';

export class UpdateUserDto {
  /**
   * @example 'admin@gmail.com'
   */
  @ValidateIf((_, value) => value)
  @IsEmail()
  email?: string;

  /**
   * @example 'Admin'
   */
  name?: string;

  /**
   * @example '0123456789'
   */
  phone?: string;

  /**
   * @example '01/10/2001'
   */
  birthday?: string;

  gender?: Gender;

  role?: UserRole;
}
