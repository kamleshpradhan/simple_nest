import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats/cats.controller';
import { CatsService } from './cats/cats/cats.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookmarkService } from './bookmark/bookmark.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { BookmarkController } from './bookmark/bookmark.controller';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BookmarkModule,
  ],
  controllers: [AppController, CatsController, BookmarkController],
  providers: [AppService, CatsService, UsersService, BookmarkService],
})
export class AppModule {}
