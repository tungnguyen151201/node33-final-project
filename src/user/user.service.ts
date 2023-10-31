import {
  BadRequestException,
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
  async create(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;

      const checkEmail = await this.findOneByEmail(email);
      if (checkEmail) {
        throw new ConflictException('Email existed!');
      }

      const newUser: CreateUserDto = {
        email: createUserDto.email,
        password: bcrypt.hashSync(createUserDto.password, 10),
        name: createUserDto.name,
        phone: createUserDto.phone,
        birthday: createUserDto.birthday,
        gender: createUserDto.gender,
        role: createUserDto.role,
      };

      const data = await this.user.create({ data: newUser });
      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findAll() {
    try {
      const data = await this.user.findMany();
      if (!data) return [];
      return data.map((user) => new UserEntity({ ...user }));
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findOne(id: number) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const data = await this.user.findUnique({ where: { id } });
      if (!data) return null;
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
      if (!data) return null;
      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      const data = await this.user.update({
        where: { id },
        data: {
          email: updateUserDto.email,
          name: updateUserDto.name,
          phone: updateUserDto.phone,
          birthday: updateUserDto.birthday,
          gender: updateUserDto.gender,
          role: updateUserDto.role,
        },
      });
      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async remove(id: number) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      const data = await this.user.delete({ where: { id } });
      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async search(keyword: string) {
    try {
      const data = await this.user.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
      });
      if (!data) return [];
      return data.map((user) => new UserEntity({ ...user }));
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async searchPagination(
    pageIndex: string,
    pageSize: string,
    keyword?: string,
  ) {
    try {
      if (!pageIndex || !pageSize) {
        throw new BadRequestException('Invalid params');
      }
      const page = Number.parseInt(pageIndex);
      const size = Number.parseInt(pageSize);

      const data = await this.user.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
          name: {
            contains: keyword,
          },
        },
      });
      if (!data) return [];
      return data.map((user) => new UserEntity({ ...user }));
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async uploadAvatar(file: Express.Multer.File, req: any) {
    try {
      if (!file) {
        throw new InternalServerErrorException(
          'Upload failed. Please try again later!',
        );
      }
      const data = await this.user.update({
        where: { id: req.user.id },
        data: {
          avatar: `http://${process.env.DOMAIN_NAME}/images/${file.filename}`,
        },
      });

      return new UserEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }
}
