import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateUserDto, UserRoles, UserService } from 'src/domain';
import { Roles } from 'src/common/decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Roles(UserRoles.admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneBy({ id });
  }

  @Roles(UserRoles.user)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
