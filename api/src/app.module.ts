import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './features/users';
import { FavouritesModule } from './features/favourites';
import { NotesModule } from './features/notes';
import { AuthModule } from './features/auth';
import { PrismaModule } from './shared/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UsersModule,
    FavouritesModule,
    NotesModule,
    AuthModule,
  ],
})
export class AppModule {}
