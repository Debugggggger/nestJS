import { Controller, Req } from '@nestjs/common';
import { Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  @Get('/authenticate')
  @UseGuards(JwtAuthGuard)
  isAuthenticated(@Req() req: any): any {
    const user: any = req.user;
    console.log(user);
    console.log('!! controller');
    return user;
  }
}
