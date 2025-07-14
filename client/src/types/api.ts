// API response types from PokeAPI

export interface PokeAPIStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokeAPIMove {
  move: {
    name: string;
  };
}

export interface PokeAPIType {
  type: {
    name: string;
  };
}

export interface PokeAPIResponse {
  id: number;
  name: string;
  types: PokeAPIType[];
  stats: PokeAPIStat[];
  moves: PokeAPIMove[];
}
