import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Put,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto/upload-image.dto';
import { UserRole } from 'src/auth/enum/user-role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { Public } from 'src/decorators/public.decorator';
import { multerOptions } from 'src/config/multer.config';

@Controller('location')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /**
   * Only Admin can create location
   */
  @Post()
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.locationService.findAll();
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
    return this.locationService.searchPagination(pageIndex, pageSize, keyword);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  /**
   * Only Admin can edit location
   */
  @Put(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  /**
   * Only Admin can delete location
   */
  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }

  /**
   * Only Admin can upload location image
   */
  @Post('upload-image')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  uploadImage(
    @Query('locationId') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.locationService.uploadImage(+id, file);
  }
}
