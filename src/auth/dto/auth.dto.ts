import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  role: string;
}

export class SignInDto {
  email: string;
  password: string;
}
