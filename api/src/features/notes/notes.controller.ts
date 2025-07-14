import {
  Controller,
  Get,
  Post,
  Put,
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
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNoteDto, UpdateNoteDto } from './dto';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(':favouriteId')
  async getNotes(
    @Param('favouriteId') favouriteId: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as { userId: number }).userId;
    return this.notesService.findAllForFavourite(Number(favouriteId), userId);
  }

  @Post(':favouriteId')
  @HttpCode(HttpStatus.CREATED)
  async addNote(
    @Param('favouriteId') favouriteId: string,
    @Body() createNoteDto: CreateNoteDto,
    @Req() req: Request,
  ) {
    const userId = (req.user as { userId: number }).userId;
    return this.notesService.addNote(Number(favouriteId), userId, createNoteDto.content);
  }

  @Put(':noteId')
  @HttpCode(HttpStatus.OK)
  async updateNote(
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req: Request,
  ) {
    const userId = (req.user as { userId: number }).userId;
    const note = await this.notesService.findOne(Number(noteId));
    
    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }
    
    if (note.favourite.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    
    return this.notesService.updateNote(Number(noteId), userId, updateNoteDto.content);
  }

  @Delete(':noteId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeNote(
    @Param('noteId') noteId: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as { userId: number }).userId;
    const note = await this.notesService.findOne(Number(noteId));
    
    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }
    
    if (note.favourite.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    
    await this.notesService.removeNote(Number(noteId));
  }
}
