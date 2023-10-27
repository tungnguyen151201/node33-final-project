import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  private review = this.prisma.review;
  private room = this.prisma.room;
  async create(createReviewDto: CreateReviewDto, req: any) {
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
        where: { id },
      });
      if (!data) return null;
      return new ReviewEntity({ ...data });
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
        throw new NotFoundException('review not found!');
      }
      const userId: number = req.user.id;
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

  async remove(id: number) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid params');
      }
      const review = await this.findOne(id);
      if (!review) {
        throw new NotFoundException('Review not found!');
      }
      const data = await this.review.delete({ where: { id } });
      return new ReviewEntity({ ...data });
    } catch (e) {
      if (e.status === 500) {
        throw new InternalServerErrorException(e.message);
      } else throw e;
    }
  }
}
