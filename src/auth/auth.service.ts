/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';



@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt:JwtService, private config:ConfigService ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return user
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
      throw err;
    }
  }

  async signin(dto: AuthDto){
    const users = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!users) {
      throw new ForbiddenException('credentials incorrect');
    }
    const pwdMatches = await argon.verify(users.hash, dto.password);
    if (!pwdMatches) {
      throw new ForbiddenException('credentials incorrect');
    }
    return this.signToken(users.id,users.email)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async signToken(userId:number, email:string):Promise<{access_token:string}>{
    const payload = {
      sub:userId,
      email
    }
    const secret = this.config.get('JWT_SECRET')
    const token = await this.jwt.signAsync(payload,{
      secret:secret
    })
    return{
      access_token:token
    }
  }
}


