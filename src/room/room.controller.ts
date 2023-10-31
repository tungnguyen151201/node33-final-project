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
import { UploadImageDto } from 'src/location/dto/upload-image.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'src/auth/enum/user-role.enum';
import { multerOptions } from 'src/config/multer.config';

@Controller('room')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  /**
   * Only Admin can create room
   */
  @Post()
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.roomService.findAll();
  }

  @Get('search-by-location')
  @Public()
  searchByLocation(@Query('locationId') id: string) {
    return this.roomService.searchByLocation(+id);
  }

  @Get('search-pagination')
  @Public()
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
  @Public()
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  /**
   * Only Admin can edit room
   */
  @Put(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  /**
   * Only Admin can delete room
   */
  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }

  /**
   * Only Admin can upload room image
   */
  @Post('upload-image')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  uploadImage(
    @Query('roomId') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.roomService.uploadImage(+id, file);
  }
}
