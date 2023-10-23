import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
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
}
