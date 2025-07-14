import { 
  Controller, 
  Get, 
  Param, 
  UseGuards,
  NotFoundException,
  ForbiddenException,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    const userId = (req.user as { userId: number }).userId;
    const user = await this.usersService.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      favourites: user.favourites,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as { userId: number }).userId;
    
    if (Number(id) !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const user = await this.usersService.findById(Number(id));
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      favourites: user.favourites,
    };
  }
}
