import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Request,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('review')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createReviewDto: CreateReviewDto, @Request() req: any) {
    return this.reviewService.create(createReviewDto, req);
  }

  @Get()
  @Public()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('search-by-room/:roomId')
  @Public()
  searchByRoom(@Param('roomId') roomId: string) {
    return this.reviewService.searchByRoom(+roomId);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() req: any,
  ) {
    return this.reviewService.update(+id, updateReviewDto, req);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Request() req: any) {
    return this.reviewService.remove(+id, req);
  }
}
