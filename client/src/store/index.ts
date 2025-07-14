import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "../features/pokemon";
import loadingReducer from "../features/loading/loadingSlice";
import { authReducer } from "../features/auth";
import { favouritesReducer } from "../features/favourites";
import { notesReducer } from "../features/notes";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    loading: loadingReducer,
    auth: authReducer,
    favourites: favouritesReducer,
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
