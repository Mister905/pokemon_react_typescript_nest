import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { GetPokemonListArgs } from "../../types/pokemon";
import type { PokeAPIResponse } from "../../types/api";

export const getPokemonList = createAsyncThunk(
  "pokemon/getPokemonList",
  async ({ offset, limit }: GetPokemonListArgs) => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      return res.data.results; // Array of { name, url }
    } catch (error) {
      throw new Error(`Failed to fetch pokemon list: ${error}`);
    }
  }
);

export const getPokemon = createAsyncThunk<PokeAPIResponse, number>(
  "pokemon/getPokemon",
  async (id: number) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(`Failed to fetch pokemon ${id}: ${error}`);
    }
  }
);

export const updateOffset = createAsyncThunk<number, number>(
  "pokemon/updateOffset",
  async (newOffset: number) => {
    return newOffset;
  }
);
