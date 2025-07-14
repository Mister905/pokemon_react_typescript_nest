import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export interface Favourite {
  id: number;
  pokemonId: number;
  pokemonName: string;
  userId: number;
  notes: Note[];
  createdAt: string; // ISO date string from API
  updatedAt: string; // ISO date string from API
}

interface Note {
  id: number;
  content: string;
  favouriteId: number;
  createdAt: string; // ISO date string from API
  updatedAt: string; // ISO date string from API
}

interface FavouritesState {
  favourites: Favourite[];
  loading: boolean;
  error: string | null;
}

const initialState: FavouritesState = {
  favourites: [],
  loading: false,
  error: null
};

export const fetchFavourites = createAsyncThunk(
  'favourites/fetchFavourites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/favourites');
      return response.data || [];
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch favourites';
      return rejectWithValue(message);
    }
  }
);

export const addFavourite = createAsyncThunk(
  'favourites/addFavourite',
  async ({ pokemonId, pokemonName }: { pokemonId: number; pokemonName: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/favourites', { pokemonId, pokemonName });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to add favourite';
      return rejectWithValue(message);
    }
  }
);

export const removeFavourite = createAsyncThunk(
  'favourites/removeFavourite',
  async (favouriteId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/favourites/${favouriteId}`);
      return favouriteId;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to remove favourite';
      return rejectWithValue(message);
    }
  }
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        state.favourites.unshift(action.payload);
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.favourites = state.favourites.filter(f => f.id !== action.payload);
      });
  }
});

export const { clearError } = favouritesSlice.actions;

// Selector to check if a Pokemon is already in favourites
export const selectIsPokemonFavourited = (state: { favourites: FavouritesState }, pokemonId: number) => {
  return state.favourites.favourites.some(favourite => favourite.pokemonId === pokemonId);
};

export default favouritesSlice.reducer;
