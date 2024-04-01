import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { toast } from "react-toastify";

import signApi from "../apis/signApi";

import axios from "axios";

import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getToken } from "../../utils/getToken";
import { ToastAndroid } from "react-native";

export const signIn = createAsyncThunk(
  "user/signIn",
  async (userInfo, thunkAPI) => {
    try {
      const response = await signApi.post(
        "/auth/signin",
        JSON.stringify(userInfo)
      );
      SecureStore.setItem("token", response.data.token);
      // AsyncStorage.setItem("bearerToken", response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    token: SecureStore.getItem("token") || null,
    // token: "",
    status: "idle",
    error: null,
    userInformation: {
      email: "",
      password: "",
    },
    isClickedToSignInButton: false,
    eyeIsClicked: false,
    isLoggedIn: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.userInformation.email = action.payload;
    },
    setPassword: (state, action) => {
      state.userInformation.password = action.payload;
    },
    signOut: (state) => {
      SecureStore.deleteItemAsync("token");
      // AsyncStorage.removeItem("bearerToken");
      state.token = null;
      state.status = "idle";
    },
    setTokenNull: (state) => {
      state.token = null;
      state.status = "idle";
    },
    changeStatus: (state) => {
      state.status = "idle";
    },
    setIsClickedToSignInButton: (state) => {
      state.isClickedToSignInButton = !state.isClickedToSignInButton;
    },
    setEyeIsClicked: (state) => {
      state.eyeIsClicked = !state.eyeIsClicked;
    },
    setIsLoggedIn: (state) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userInformation = {
          email: "",
          password: "",
        };
      })
      .addCase(signIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signIn.rejected, (state) => {
        state.status = "failed";
        ToastAndroid.show(
          "Email or password is invalid. Please try again!",
          ToastAndroid.LONG
        );
      });
  },
});

export const signInActions = signInSlice.actions;

export default signInSlice.reducer;
