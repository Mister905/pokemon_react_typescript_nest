import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { GetPokemonListArgs } from "../types/pokemon";
import type { PokeAPIResponse } from "../types/api";

export const getPokemonList = createAsyncThunk(
  "pokemon/getPokemonList",
  async ({ offset, limit }: GetPokemonListArgs) => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    return res.data.results; // Array of { name, url }
  }
);

export const getPokemon = createAsyncThunk<PokeAPIResponse, number>(
  "pokemon/getPokemon",
  async (id: number) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  }
);

export const updateOffset = createAsyncThunk<number, number>(
  "pokemon/updateOffset",
  async (newOffset: number) => {
    return newOffset;
  }
);
