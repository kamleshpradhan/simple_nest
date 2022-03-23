import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getCats(): string {
    return 'hello this is the cats route';
  }
  sayHello(): string {
    return 'this is the second route';
  }
}
