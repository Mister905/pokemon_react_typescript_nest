import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { Favourite } from './favourite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite])],
  providers: [FavouritesService],
  controllers: [FavouritesController],
})
export class FavouritesModule {}
