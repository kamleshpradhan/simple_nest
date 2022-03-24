import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarksDto, EditBookmarksDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        id: userId,
      },
    });
  }
  getBookmarksById(userId: number, bookmarkId: number) {
    console.log(bookmarkId);
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }
  async createBookmarks(userId: number, dto: CreateBookmarksDto) {
    const bookmark = this.prisma.bookmark.create({
      data: {
        userId: userId,
        ...dto,
      },
    });
    return bookmark;
  }

  async editBookmarksById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarksDto,
  ) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
      },
    });
    if (!bookmark || bookmark.userId != userId) {
      throw new ForbiddenException('Access Denied Invalid Credentials');
    }
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkId(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
      },
    });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access denied invalid credentials.');
    }
    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
