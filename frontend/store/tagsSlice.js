import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTagsApi, addTagApi } from '../services/api';

export const fetchTagSuggestions = createAsyncThunk(
  'tags/fetchSuggestions',
  async (query) => {
    const data = await fetchTagsApi(query || '');
    return { query: query || '', items: data };
  }
);

export const fetchAllTags = createAsyncThunk('tags/fetchAll', async () => {
  const data = await fetchTagsApi('');
  return data;
});

export const addNewTag = createAsyncThunk('tags/addNew', async (name) => {
  const data = await addTagApi(name);
  return data;
});

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    suggestions: [],
    all: [],
    lastQuery: '',
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagSuggestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTagSuggestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastQuery = action.payload.query;
        state.suggestions = action.payload.items;
      })
      .addCase(fetchTagSuggestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(addNewTag.fulfilled, (state, action) => {
        state.all.push(action.payload);
      });
  }
});

export default tagsSlice.reducer;
