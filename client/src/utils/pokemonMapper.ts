import type { PokeAPIResponse } from "../types/api";
import type { Pokemon } from "../types/pokemon";

export function mapPokeAPIToPokemon(apiData: PokeAPIResponse): Pokemon {
  if (!apiData || !apiData.id || !apiData.name) {
    throw new Error('Invalid Pokemon API data provided');
  }

  return {
    id: apiData.id,
    name: apiData.name,
    img_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${apiData.id}.png`,
    type: apiData.types?.[0]?.type?.name ?? "unknown",
    stats: apiData.stats?.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })) ?? [],
    moves: apiData.moves?.slice(0, 10).map((move) => move.move.name) ?? [],
  };
}
