import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'prisma/prisma.service';
import { BookingEntity } from './entities/booking.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  private booking = this.prisma.booking;
  private room = this.prisma.room;

  private async validateParams(dto: CreateBookingDto | UpdateBookingDto) {
    const room = await this.room.findFirst({
      where: { id: dto.roomId },
    });
    if (!room) {
      return new BadRequestException('Room not found!');
    }

    if (dto.guestNumber > room.guest) {
      const message =
        room.guest > 1
          ? `This room can only accommodate a maximum of ${room.guest} people!`
          : 'This room can only accommodate a maximum of 1 person!';
      return new BadRequestException(message);
    }

    const checkInDate = new Date(dto.checkInDate);
    const checkOutDate = new Date(dto.checkOutDate);

    if (checkInDate > checkOutDate) {
      return new BadRequestException(
        'Check in date must be smaller than check out date!',
      );
    }

    return null;
  }
  async create(createBookingDto: CreateBookingDto, req: any) {
    try {
      const exception = await this.validateParams(createBookingDto);
      if (exception !== null) {
        throw exception;
      }
      const newBooking: CreateBookingDto = {
        roomId: createBookingDto.roomId,
        checkInDate: new Date(createBookingDto.checkInDate),
        checkOutDate: new Date(createBookingDto.checkOutDate),
        guestNumber: createBookingDto.guestNumber,
      };
      const userId: number = req.user.id;
      const data = await this.booking.create({
        data: { ...newBooking, userId },
      });
      return new BookingEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findAll() {
    try {
      const data = await this.booking.findMany();
      if (!data) return [];
      return data.map((booking) => new BookingEntity({ ...booking }));
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
      const data = await this.booking.findUnique({
        include: {
          User: true,
          Room: {
            include: {
              Location: true,
            },
          },
        },
        where: { id },
      });
      if (!data) return null;
      const { User, Room } = data;
      const { Location } = Room;
      delete data.userId;
      delete data.roomId;
      delete data.User;
      delete data.Room;
      delete Room.locationId;
      delete Room.Location;
      return new BookingEntity({
        ...data,
        user: new UserEntity({ ...User }),
        room: { ...Room, location: Location },
      });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto, req: any) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }

      const booking = await this.findOne(id);
      if (!booking) {
        throw new NotFoundException('Booking not found!');
      }

      const userId: number = req.user.id;
      if (booking.user.id !== userId) {
        throw new ForbiddenException(
          'You do not have permission to update this booking!',
        );
      }

      const exception = await this.validateParams(updateBookingDto);
      if (exception !== null) {
        throw exception;
      }

      const data = await this.booking.update({
        where: { id },
        data: {
          userId,
          roomId: updateBookingDto.roomId,
          checkInDate: new Date(updateBookingDto.checkInDate),
          checkOutDate: new Date(updateBookingDto.checkOutDate),
          guestNumber: updateBookingDto.guestNumber,
        },
      });
      return new BookingEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async remove(id: number, req: any) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const booking = await this.findOne(id);
      if (!booking) {
        throw new NotFoundException('Booking not found!');
      }
      const userId: number = req.user.id;
      if (booking.user.id !== userId) {
        throw new ForbiddenException(
          'You do not have permission to delete this booking!',
        );
      }
      const data = await this.booking.delete({ where: { id } });
      return new BookingEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async searchByUser(userId: number) {
    try {
      if (!userId) {
        throw new BadRequestException('Invalid params');
      }
      const data = await this.booking.findMany({
        where: { userId },
      });
      if (!data) return [];
      return data.map((booking) => new BookingEntity({ ...booking }));
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }
}
