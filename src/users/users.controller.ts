import { Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDTO } from './update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    return this.usersService.create(user);
  }

  @Delete(':id')
  removeOne(@Param() id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  updateOne(@Param() id: string, @Body() user: UpdateUserDTO) {
    return this.usersService.update(id, user);
  }
}
