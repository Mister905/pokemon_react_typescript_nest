import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateFavouriteDto {
  @IsNumber()
  @IsNotEmpty()
  pokemonId!: number;

  @IsString()
  @IsNotEmpty()
  pokemonName!: string;
}
