import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForFavourite(favouriteId: number, userId: number) {
    try {
      // Verify the favourite belongs to the user
      const favourite = await this.prisma.favourite.findFirst({
        where: {
          id: favouriteId,
          userId,
        },
      });

      if (!favourite) {
        throw new NotFoundException(`Favourite with ID ${favouriteId} not found`);
      }

      return await this.prisma.note.findMany({
        where: { favouriteId },
        orderBy: {
          id: 'desc',
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Failed to fetch notes');
    }
  }

  async addNote(favouriteId: number, userId: number, content: string) {
    try {
      // Verify the favourite belongs to the user
      const favourite = await this.prisma.favourite.findFirst({
        where: {
          id: favouriteId,
          userId,
        },
      });

      if (!favourite) {
        throw new NotFoundException(`Favourite with ID ${favouriteId} not found`);
      }

      return await this.prisma.note.create({
        data: {
          content,
          favouriteId,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create note');
    }
  }

  async findOne(noteId: number) {
    try {
      return await this.prisma.note.findUnique({
        where: { id: noteId },
        include: {
          favourite: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }
  }

  async updateNote(noteId: number, userId: number, content: string) {
    try {
      const note = await this.prisma.note.findUnique({
        where: { id: noteId },
        include: {
          favourite: true,
        },
      });

      if (!note) {
        throw new NotFoundException(`Note with ID ${noteId} not found`);
      }

      if (note.favourite.userId !== userId) {
        throw new ForbiddenException('Access denied');
      }

      return await this.prisma.note.update({
        where: { id: noteId },
        data: { content },
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new Error('Failed to update note');
    }
  }

  async removeNote(noteId: number) {
    try {
      await this.prisma.note.delete({
        where: { id: noteId },
      });
    } catch (error) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }
  }
}
