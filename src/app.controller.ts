import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get('hello/:id/:name')
  getHello(): string {
    return this.appService.getHello();
  }
}
