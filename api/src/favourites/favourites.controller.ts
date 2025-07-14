import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from 'src/users/user.entity';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserFavourites(@Request() req) {
    return this.favouritesService.findAllForUser(req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addUserFavourite(
    @Request() req,
    @Body() body: { pokemonID: number; pokemonName: string; notes?: string },
  ) {
    // Create a user object with just the id for relation
    const user = { id: req.user.userId } as User;

    return this.favouritesService.addFavourite(
      user,
      body.pokemonID,
      body.pokemonName,
      body.notes,
    );
  }
}
