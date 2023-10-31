import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'prisma/prisma.service';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  private room = this.prisma.room;
  private location = this.prisma.location;
  async create(createRoomDto: CreateRoomDto) {
    try {
      const location = await this.location.findFirst({
        where: { id: createRoomDto.locationId },
      });

      if (!location) {
        throw new BadRequestException('Location not found!');
      }
      const newRoom: CreateRoomDto = {
        roomName: createRoomDto.roomName,
        guest: createRoomDto.guest,
        bedroom: createRoomDto.bedroom,
        bed: createRoomDto.bed,
        description: createRoomDto.description,
        price: createRoomDto.price,
        washingMachine: createRoomDto.washingMachine,
        iron: createRoomDto.iron,
        television: createRoomDto.television,
        airConditioner: createRoomDto.airConditioner,
        wifi: createRoomDto.wifi,
        stove: createRoomDto.stove,
        parkingLot: createRoomDto.parkingLot,
        swimmingPool: createRoomDto.swimmingPool,
        image: createRoomDto.image,
        locationId: createRoomDto.locationId,
      };
      const data = await this.room.create({ data: newRoom });
      delete data.locationId;
      return new RoomEntity({ ...data, location });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findAll() {
    try {
      const data = await this.room.findMany();
      if (!data) return [];
      return data.map((room) => new RoomEntity({ ...room }));
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async searchByLocation(id: number) {
    try {
      const data = await this.room.findMany({ where: { locationId: id } });
      if (!data) return [];
      return data.map((room) => new RoomEntity({ ...room }));
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
      const data = await this.room.findUnique({
        include: {
          Location: true,
        },
        where: { id },
      });
      if (!data) return null;
      const { Location } = data;
      delete data.locationId;
      delete data.Location;
      return new RoomEntity({ ...data, location: Location });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const room = await this.findOne(id);
      if (!room) {
        throw new NotFoundException('Room not found!');
      }

      const location = await this.location.findFirst({
        where: { id: updateRoomDto.locationId },
      });

      if (!location) {
        throw new BadRequestException('Location not found!');
      }
      const data = await this.room.update({
        where: { id },
        data: {
          roomName: updateRoomDto.roomName,
          guest: updateRoomDto.guest,
          bedroom: updateRoomDto.bedroom,
          bed: updateRoomDto.bed,
          description: updateRoomDto.description,
          price: updateRoomDto.price,
          washingMachine: updateRoomDto.washingMachine,
          iron: updateRoomDto.iron,
          television: updateRoomDto.television,
          airConditioner: updateRoomDto.airConditioner,
          wifi: updateRoomDto.wifi,
          stove: updateRoomDto.stove,
          parkingLot: updateRoomDto.parkingLot,
          swimmingPool: updateRoomDto.swimmingPool,
          image: updateRoomDto.image,
          locationId: updateRoomDto.locationId,
        },
      });
      return new RoomEntity({ ...data });
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
      const room = await this.findOne(id);
      if (!room) {
        throw new NotFoundException('Room not found!');
      }
      const data = await this.room.delete({ where: { id } });
      return new RoomEntity({ ...data });
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

      const data = await this.room.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
          roomName: {
            contains: keyword,
          },
        },
      });
      if (!data) return [];
      return data.map((room) => new RoomEntity({ ...room }));
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
      const data = await this.room.update({
        where: { id },
        data: {
          image: `http://${process.env.DOMAIN_NAME}/images/${file.filename}`,
        },
      });

      return new RoomEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }
}
