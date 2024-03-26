import { configureStore } from '@reduxjs/toolkit';
import signInSlice from '../redux/SignIn/signInSlice';
import signUpSlice from '../redux/SignIn/signUpSlice';

export const store = configureStore({
    reducer: {
      signIn: signInSlice,
      signUp: signUpSlice,
    },
  })