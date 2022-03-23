import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Userdto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
  sayHello(): string {
    return 'Hello I am a user';
  }
  addUser(dto: Userdto) {
    return dto;
  }
}
