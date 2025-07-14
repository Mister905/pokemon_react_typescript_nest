import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from '../favourites/favourite.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourite)
    private favouritesRepository: Repository<Favourite>,
  ) {}

  async findAllForUser(userId: number) {
    return this.favouritesRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async addFavourite(
    user: User,
    pokemonID: number,
    pokemonName: string,
    notes?: string,
  ) {
    const existing = await this.favouritesRepository.findOne({
      where: { user: { id: user.id }, pokemonID },
    });

    if (existing) {
      console.log('Favourite already exists:', existing);
      return existing;
    }

    const favourite = this.favouritesRepository.create({
      pokemonID,
      pokemonName,
      notes,
      user,
    });

    console.log('Saving new favourite:', favourite);
    return this.favouritesRepository.save(favourite);
  }

  // async updateFavourite(
  //   id: number,
  //   userId: number,
  //   updateData: Partial<Favourite>,
  // ) {
  //   const favourite = await this.favouritesRepository.findOne({
  //     where: { id, user: { id: userId } },
  //   });

  //   if (!favourite) {
  //     throw new Error('Favourite not found or access denied');
  //   }

  //   Object.assign(favourite, updateData);

  //   return this.favouritesRepository.save(favourite);
  // }
}
