import { configureStore } from '@reduxjs/toolkit';
import signInSlice from '../redux/SignIn/signInSlice';
import signUpSlice from '../redux/SignIn/signUpSlice';
import userForgotPasswordSlice from '../redux/User/userForgotPasswordSlice';

export const store = configureStore({
    reducer: {
      signIn: signInSlice,
      signUp: signUpSlice,
      userForgotPassword: userForgotPasswordSlice,
    },
  })