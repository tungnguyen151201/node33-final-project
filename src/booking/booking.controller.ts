import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('booking')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createBookingDto: CreateBookingDto, @Request() req: any) {
    return this.bookingService.create(createBookingDto, req);
  }

  @Get()
  @Public()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get('search-by-user/:userId')
  @Public()
  searchByUser(@Param('userId') userId: string) {
    return this.bookingService.searchByUser(+userId);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Request() req: any,
  ) {
    return this.bookingService.update(+id, updateBookingDto, req);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Request() req: any) {
    return this.bookingService.remove(+id, req);
  }
}
