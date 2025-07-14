import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favourite } from '../favourites/favourite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Favourite, (favourite) => favourite.user)
  favourites: Favourite[];
}
