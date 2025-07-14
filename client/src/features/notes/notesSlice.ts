import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export interface Note {
  id: number;
  content: string;
  favouriteId: number;
  createdAt: string; // ISO date string from API
  updatedAt: string; // ISO date string from API
}

export interface CreateNoteData {
  favouriteId: number;
  content: string;
}

export interface UpdateNoteData {
  noteId: number;
  content: string;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  currentFavouriteId: number | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
  currentFavouriteId: null,
};

// Fetch notes for a specific favourite
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (favouriteId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/notes/${favouriteId}`);
      return { notes: response.data, favouriteId };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch notes';
      return rejectWithValue(message);
    }
  }
);

// Add a new note
export const addNote = createAsyncThunk(
  'notes/addNote',
  async ({ favouriteId, content }: CreateNoteData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/notes/${favouriteId}`, { content });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to add note';
      return rejectWithValue(message);
    }
  }
);

// Update an existing note
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ noteId, content }: UpdateNoteData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/notes/${noteId}`, { content });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to update note';
      return rejectWithValue(message);
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (noteId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/notes/${noteId}`);
      return noteId;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to delete note';
      return rejectWithValue(message);
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentFavouriteId: (state, action) => {
      state.currentFavouriteId = action.payload;
    },
    clearNotes: (state) => {
      state.notes = [];
      state.currentFavouriteId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes;
        state.currentFavouriteId = action.payload.favouriteId;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add note
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload);
      })
      // Update note
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      // Delete note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
      });
  },
});

export const { clearError, setCurrentFavouriteId, clearNotes } = notesSlice.actions;
export default notesSlice.reducer;
