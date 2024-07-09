import { configureStore } from '@reduxjs/toolkit';
import credentialsReducer from './features/credentials/credentialsSlice';

const store = configureStore({
  reducer: {
    credentials: credentialsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
