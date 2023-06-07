import { Body, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { Controller, Param } from '@nestjs/common';
import { ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
// import { ApiOperation } from '@nestjs/swagger';
import { Cat } from './cats.entity';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  // @UseFilters(HttpExceptionFilter) //개별로 exception filter를 적용시킴
  getAllCat(): Promise<Cat[]> {
    console.log('Hello Controller');
    return this.catsService.findAll();
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    // console.log(param);
    // console.log(typeof param);
    return this.catsService.findOne(id);
  }

  @Post()
  createCat(@Body() cat: Cat) {
    return this.catsService.create(cat);
  }

  @Put(':id')
  updateCat(@Param('id') id: number, @Body() cat: Cat) {
    console.log(id);
    console.log(typeof id);
    return this.catsService.update(id, cat);
  }

  @Delete(':id')
  deleteCat(@Param('id') id: number) {
    return this.catsService.remove(id);
  }
}
