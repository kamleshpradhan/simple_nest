import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  getCats(): string {
    return this.catService.getCats();
  }
  @Get('hello')
  hellCats(): string {
    return this.catService.sayHello();
  }
}
