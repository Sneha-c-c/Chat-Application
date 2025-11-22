import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from './tagsSlice';
import messagesReducer from './messagesSlice';

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
    messages: messagesReducer
  }
});
