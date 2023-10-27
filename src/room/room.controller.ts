import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadImageDto } from 'src/location/dto/upload-image.dto';

@Controller('room')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Room')
@ApiBearerAuth()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get('search-by-location')
  searchByLocation(@Query('locationId') id: string) {
    return this.roomService.searchByLocation(+id);
  }

  @Get('search-pagination')
  @ApiQuery({ name: 'pageIndex', type: Number })
  @ApiQuery({ name: 'pageSize', type: Number })
  @ApiQuery({ name: 'keyword', required: false })
  searchPagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword?: string,
  ) {
    return this.roomService.searchPagination(pageIndex, pageSize, keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }

  @Post('upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (_, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  uploadImage(
    @Query('roomId') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.roomService.uploadImage(+id, file);
  }
}
