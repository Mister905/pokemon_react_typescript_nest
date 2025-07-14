import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateFavouriteDto } from './dto';

@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForUser(userId: number) {
    try {
      return await this.prisma.favourite.findMany({
        where: { userId },
        include: {
          notes: true,
        },
        orderBy: {
          id: 'desc',
        },
      });
    } catch (error) {
      throw new NotFoundException('Failed to fetch favourites');
    }
  }

  async create(createFavouriteDto: CreateFavouriteDto, userId: number) {
    const { pokemonId, pokemonName } = createFavouriteDto;

    // Check if favourite already exists for this user and pokemon
    const existingFavourite = await this.prisma.favourite.findFirst({
      where: {
        userId,
        pokemonId,
      },
    });

    if (existingFavourite) {
      throw new ConflictException('Pokemon already in favourites');
    }

    try {
      return await this.prisma.favourite.create({
        data: {
          pokemonId,
          pokemonName,
          userId,
        },
        include: {
          notes: true,
        },
      });
    } catch (error) {
      throw new Error('Failed to create favourite');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.favourite.findUnique({
        where: { id },
        include: {
          notes: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Favourite with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.favourite.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Favourite with ID ${id} not found`);
    }
  }
}
