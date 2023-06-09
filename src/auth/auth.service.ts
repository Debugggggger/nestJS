import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginUserDTO } from 'src/users/login-user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './jwt/jwt.payload';
import { JWT_ACCESS_EXPIRED, JWT_REFRESH_EXPIRED } from '../constant/time';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const isPasswordValided: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValided) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }
    const access = {
      type: 'accessToken',
      email: email,
      sub: user.userID,
    };
    const refresh = {
      type: 'refreshToken',
      email: email,
      sub: user.userID,
    };
    const accessToken = this.jwtService.sign(access, {
      expiresIn: JWT_ACCESS_EXPIRED,
    });
    const refreshToken = this.jwtService.sign(refresh, {
      expiresIn: JWT_REFRESH_EXPIRED,
    });

    return { accessToken, refreshToken };
  }
  async tokenValidateUser(payload: Payload): Promise<LoginUserDTO | undefined> {
    console.log('!! validator?');
    return await this.usersService.findUserByEmail(payload.email);
  }
}
