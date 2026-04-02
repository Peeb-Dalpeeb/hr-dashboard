import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types';

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

// Load default state from localStorage to persist login
const initialState: AuthState = {
  currentUser: localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')!)
    : null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
