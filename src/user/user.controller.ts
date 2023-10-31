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
  Request,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { UserRole } from 'src/auth/enum/user-role.enum';
import { Public } from 'src/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { multerOptions } from 'src/config/multer.config';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.userService.findAll();
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
    return this.userService.searchPagination(pageIndex, pageSize, keyword);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * Only Admin can delete user
   */
  @Delete(':id')
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('search/:name')
  @Public()
  search(@Param('name') keyword: string) {
    return this.userService.search(keyword);
  }

  @Post('upload-avatar')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAvatarDto })
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
    return this.userService.uploadAvatar(file, req);
  }

  @Get('search-email/:email')
  @Public()
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
}
