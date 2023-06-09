import { Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Body, Controller, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDTO } from './update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get('/validate')
  @UseGuards(JwtAuthGuard) //UseGuards가 추가되었을때는 request에 요청한 유저 정보를 보낸다.
  getCurrentCat(@Req() req: any): any {
    const user: any = req.user;
    return user;
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get()
  getOne(@Param() id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    return this.usersService.create(user);
  }

  @Put()
  updateOne(@Param() id: string, @Body() user: UpdateUserDTO) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  removeOne(@Param() id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() user: LoginRequestDto) {
    const response = this.authService.jwtLogIn(user);
    return response;
  }
}
