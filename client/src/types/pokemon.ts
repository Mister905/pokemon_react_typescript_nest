export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: number;
  name: string;
  img_url: string;
  type: string;
  stats: PokemonStat[];
  moves: string[];
}

export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  img_url?: string;
}

export interface PokemonState {
  pokemonList: PokemonListItem[];
  loadingPokemonList: boolean;
  loadingMore: boolean; // New state for loading more Pokemon
  pokemon: Pokemon | null;
  loadingPokemon: boolean;
  offset: number;
  limit: number;
  chunkSize: number;
}

export interface GetPokemonListArgs {
  offset: number;
  limit: number;
}
