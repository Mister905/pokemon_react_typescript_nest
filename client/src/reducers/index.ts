import { combineReducers } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemon_reducer";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Infer root state type
export default rootReducer;
