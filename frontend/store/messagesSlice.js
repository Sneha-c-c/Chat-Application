import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessagesApi, addMessageApi } from '../services/api';

// text: plain string, tags: array of tag names (e.g. ['john_doe'])
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const data = await fetchMessagesApi();
    return data;
  }
);

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ text, tags }) => {
    const payload = { text, tags: tags || [] };
    const data = await addMessageApi(payload);
    return data;
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default messagesSlice.reducer;
