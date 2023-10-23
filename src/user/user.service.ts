import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private user = this.prisma.user;
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { email, password } = createUserDto;

      const checkEmail = await this.findOneByEmail(email);
      if (checkEmail) {
        throw new ConflictException('Email existed!');
      }

      const newUser: CreateUserDto = createUserDto;
      newUser.password = bcrypt.hashSync(password, 10);

      const data = await this.user.create({ data: newUser });
      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const data = await this.user.findMany();
      return data.map((user) => new UserEntity({ ...user }));
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      const data = await this.user.findUnique({ where: { id } });
      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const data = await this.user.findFirst({
        where: { email },
      });
      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      const data = await this.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
