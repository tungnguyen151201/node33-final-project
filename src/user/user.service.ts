import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  model = new PrismaClient();
  user = this.model.user;
  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;

      const checkEmail = await this.findOneByEmail(email);
      if (checkEmail.data) {
        throw new ConflictException('Email existed!');
      }

      const newUser: CreateUserDto = createUserDto;
      newUser.password = bcrypt.hashSync(password, 10);

      const data = await this.user.create({ data: newUser });
      return { data };
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    try {
      const data = await this.user.findFirst({
        where: { email },
      });
      return { data };
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
