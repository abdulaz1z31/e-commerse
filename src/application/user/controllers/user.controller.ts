import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateUserDto, UserRoles, UserService } from 'src/domain';
import { Roles } from 'src/common/decorators';
import { UserEntity } from 'src/domain/user/entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Barcha userlarni olish' })
  @ApiResponse({
    status: 200,
    description: 'userlar royxati',
    type: [UserEntity],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one user' })
  @ApiResponse({
    status: 200,
    description: 'user malumotlari',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  findOne(@Param('id') id: string) {
    return this.userService.findOneBy({ id });
  }

  @Roles(UserRoles.user)
  @Patch(':id')
  @ApiOperation({ summary: 'userni update qilish' })
  @ApiResponse({
    status: 200,
    description: 'user update bolidi',
    type: UserEntity,
  })
  @ApiResponse({ status: 400, description: 'bad request' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'userni delete qilish' })
  @ApiResponse({
    status: 200,
    description: 'user deleted',
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
