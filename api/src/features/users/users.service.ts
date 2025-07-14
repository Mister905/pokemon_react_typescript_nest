import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        include: {
          favourites: {
            include: {
              notes: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByUsername(username: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { username },
      });
    } catch (error) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
  }
}
