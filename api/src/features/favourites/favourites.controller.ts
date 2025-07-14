import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { FavouritesService } from './favourites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFavouriteDto } from './dto';

@Controller('favourites')
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  async findAll(@Req() req: Request) {
    const userId = (req.user as { userId: number }).userId;
    return this.favouritesService.findAllForUser(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createFavouriteDto: CreateFavouriteDto,
    @Req() req: Request,
  ) {
    const userId = (req.user as { userId: number }).userId;
    return this.favouritesService.create(createFavouriteDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as { userId: number }).userId;
    const favourite = await this.favouritesService.findOne(Number(id));
    
    if (!favourite) {
      throw new NotFoundException(`Favourite with ID ${id} not found`);
    }
    
    if (favourite.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    
    await this.favouritesService.remove(Number(id));
  }
}
