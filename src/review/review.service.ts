import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewEntity } from './entities/review.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  private review = this.prisma.review;
  private room = this.prisma.room;
  async create(createReviewDto: CreateReviewDto, req: any) {
    try {
      const room = await this.room.findFirst({
        where: { id: createReviewDto.roomId },
      });
      if (!room) {
        throw new BadRequestException('Room not found!');
      }

      const newReview: CreateReviewDto = {
        roomId: createReviewDto.roomId,
        reviewDate: new Date(createReviewDto.reviewDate),
        star: createReviewDto.star,
        detail: createReviewDto.detail,
      };
      const userId: number = req.user.id;
      const data = await this.review.create({
        data: { ...newReview, userId },
      });
      return new ReviewEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async findAll() {
    try {
      const data = await this.review.findMany();
      if (!data) return [];
      return data.map((review) => new ReviewEntity({ ...review }));
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
      const data = await this.review.findUnique({
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
      return new ReviewEntity({
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

  async update(id: number, updateReviewDto: UpdateReviewDto, req: any) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const review = await this.findOne(id);
      if (!review) {
        throw new NotFoundException('Review not found!');
      }
      const userId: number = req.user.id;
      if (review.user.id !== userId) {
        throw new ForbiddenException(
          'You do not have permission to update this review!',
        );
      }
      const room = await this.room.findFirst({
        where: { id: updateReviewDto.roomId },
      });
      if (!room) {
        throw new BadRequestException('Room not found!');
      }
      const data = await this.review.update({
        where: { id },
        data: {
          userId,
          roomId: updateReviewDto.roomId,
          reviewDate: new Date(updateReviewDto.reviewDate),
          star: updateReviewDto.star,
          detail: updateReviewDto.detail,
        },
      });
      return new ReviewEntity({ ...data });
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
      const review = await this.findOne(id);
      if (!review) {
        throw new NotFoundException('Review not found!');
      }
      const userId: number = req.user.id;
      if (review.user.id !== userId) {
        throw new ForbiddenException(
          'You do not have permission to delete this review!',
        );
      }
      const data = await this.review.delete({ where: { id } });
      return new ReviewEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }

  async searchByRoom(roomId: number) {
    try {
      if (!roomId) {
        throw new BadRequestException('Invalid params');
      }
      const data = await this.review.findMany({
        where: { roomId },
      });
      if (!data) return [];
      return data.map((review) => new ReviewEntity({ ...review }));
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }
}
