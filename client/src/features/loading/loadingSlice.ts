import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  loadingMessage: string;
}

const initialState: LoadingState = {
  isLoading: false,
  loadingMessage: 'Loading...'
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (!action.payload) {
        state.loadingMessage = 'Loading...';
      }
    },
    setLoadingMessage: (state, action: PayloadAction<string>) => {
      state.loadingMessage = action.payload;
    },
    startLoading: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.loadingMessage = action.payload;
    },
    stopLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = 'Loading...';
    }
  }
});

export const { setLoading, setLoadingMessage, startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
