import { createSlice } from "@reduxjs/toolkit";
import { getPokemonList, getPokemon, updateOffset } from "../actions/pokemon";
import type { PokemonListItem, PokemonState } from "../types/pokemon";
import { mapPokeAPIToPokemon } from "../utils/pokemonMapper";

const initialState: PokemonState = {
  pokemonList: [],
  loadingPokemonList: false,
  pokemon: null,
  loadingPokemon: false,
  offset: 0,
  limit: 20,
  chunkSize: 3,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPokemonList.pending, (state) => {
      state.loadingPokemonList = true;
    });
    builder.addCase(getPokemonList.fulfilled, (state, action) => {
      const updatedList = action.payload.map((item: PokemonListItem) => {
        const parts = item.url.split("/");
        const id = Number(parts[parts.length - 2]);
        return {
          ...item,
          id,
          img_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });
      state.pokemonList.push(...updatedList);
      state.loadingPokemonList = false;
    });
    builder.addCase(getPokemon.pending, (state) => {
      state.loadingPokemon = true;
    });
    builder.addCase(getPokemon.fulfilled, (state, action) => {
      state.pokemon = mapPokeAPIToPokemon(action.payload);
      state.loadingPokemon = false;
    });
    builder.addCase(updateOffset.fulfilled, (state, action) => {
      state.offset = action.payload;
    });
  },
});

export default pokemonSlice.reducer;
