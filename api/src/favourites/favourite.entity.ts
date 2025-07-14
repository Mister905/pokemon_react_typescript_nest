import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonID: number;

  @Column()
  pokemonName: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.favourites, { onDelete: 'CASCADE' })
  user: User;
}
