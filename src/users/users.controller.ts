import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Userdto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private userServive: UsersService) {}
  @Get()
  sayHello(): string {
    return this.userServive.sayHello();
  }

  @Post('add')
  addUser(@Body() dto: Userdto) {
    return this.userServive.addUser(dto);
  }
}
