import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Favourite } from './favourites/favourite.entity';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Favourite],
      synchronize: true, // dev only
    }),
    UsersModule,
    AuthModule,
    FavouritesModule,
  ],
})
export class AppModule {}
