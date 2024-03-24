import { configureStore } from '@reduxjs/toolkit';
import signInSlice from '../redux/SignIn/signInSlice';

export const store = configureStore({
    reducer: {
      signIn: signInSlice,
    },
  })