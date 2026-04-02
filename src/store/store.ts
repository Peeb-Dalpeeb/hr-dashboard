import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { hrApi } from '../services/hrApi';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    [hrApi.reducerPath]: hrApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hrApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


setupListeners(store.dispatch);