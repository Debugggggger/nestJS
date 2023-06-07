import { Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { Controller, Param } from '@nestjs/common';
import { ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
// import { ApiOperation } from '@nestjs/swagger';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  // @UseFilters(HttpExceptionFilter) //개별로 exception filter를 적용시킴
  getAllCat() {
    console.log('Hello Controller');
    return this.catsService.readAllCat();
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    // console.log(param);
    // console.log(typeof param);
    return this.catsService.readCat();
  }

  @Put(':id')
  updateCat(@Param('id') param: number) {
    console.log(param);
    console.log(typeof param);
    return this.catsService.updateCat();
  }

  @Patch(':id')
  updateParticalCat() {
    return this.catsService.updateCat();
  }

  @Delete(':id')
  deleteCat() {
    return this.catsService.deleteCat();
  }

  // @ApiOperation({ summary: '로그인' })
  // @Post('login')
  // login() {
  //   return 'login';
  // }

  // @ApiOperation({ summary: '로그아웃' })
  // @Post('login')
  // logOut() {
  //   return 'log out';
  // }
}
