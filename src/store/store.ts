// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import communityReducer from '../features/community/communitySlice';

export const store = configureStore({
  reducer: {
    community: communityReducer,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;