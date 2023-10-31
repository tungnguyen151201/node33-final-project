import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'prisma/prisma.service';
import { LocationEntity } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  private location = this.prisma.location;
  async create(createLocationDto: CreateLocationDto) {
    try {
      const newLocation: CreateLocationDto = {
        locationName: createLocationDto.locationName,
        province: createLocationDto.province,
        country: createLocationDto.country,
        image: createLocationDto.image,
      };
      const data = await this.location.create({ data: newLocation });
      return new LocationEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findAll() {
    try {
      const data = await this.location.findMany();
      if (!data) return [];
      return data.map((location) => new LocationEntity({ ...location }));
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
      const data = await this.location.findUnique({ where: { id } });
      if (!data) return null;
      return new LocationEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const location = await this.findOne(id);
      if (!location) {
        throw new NotFoundException('Location not found!');
      }
      const data = await this.location.update({
        where: { id },
        data: {
          locationName: updateLocationDto.locationName,
          province: updateLocationDto.province,
          country: updateLocationDto.country,
          image: updateLocationDto.image,
        },
      });
      return new LocationEntity({ ...data });
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
      const location = await this.findOne(id);
      if (!location) {
        throw new NotFoundException('Location not found!');
      }
      const data = await this.location.delete({ where: { id } });
      return new LocationEntity({ ...data });
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

      const data = await this.location.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
          locationName: {
            contains: keyword,
          },
        },
      });
      if (!data) return [];
      return data.map((location) => new LocationEntity({ ...location }));
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async uploadImage(id: number, file: Express.Multer.File) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const room = await this.findOne(id);
      if (!room) {
        throw new NotFoundException('Room not found!');
      }
      if (!file) {
        throw new InternalServerErrorException(
          'Upload failed. Please try again later!',
        );
      }
      const data = await this.location.update({
        where: { id },
        data: {
          image: `http://${process.env.DOMAIN_NAME}/images/${file.filename}`,
        },
      });

      return new LocationEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }
}
