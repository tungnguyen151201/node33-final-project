import * as bcrypt from 'bcrypt';
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpDto } from './dto/auth.dto';
import { PrismaClient } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  model = new PrismaClient();
  user = this.model.user;

  async signUp(signUpDto: SignUpDto) {
    try {
      const { email, password } = signUpDto;

      const checkEmail: User[] = await this.user.findMany({ where: { email } });
      if (checkEmail.length > 0) {
        throw new ConflictException('Email existed!');
      }

      const newUser: SignUpDto = signUpDto;
      newUser.password = bcrypt.hashSync(password, 10);

      const data = await this.user.create({ data: newUser });
      return { isSuccess: true, data };
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }
}
