import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { toast } from "react-toastify";

import signApi from "../apis/signApi";

import axios from "axios";

import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getToken } from "../../utils/getToken";

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
      console.log("catch");
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
        console.log(action.payload);
        state.token = SecureStore.getItem("token");
        // state.token = AsyncStorage.getItem("bearerToken");
      })
      .addCase(signIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signIn.rejected, (state) => {
        state.status = "failed";
        console.log("failed");
        // toast.error("Email or password is invalid. Please try again!", {
        //   position: "bottom-left",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
      });
  },
});

export const signInActions = signInSlice.actions;

export default signInSlice.reducer;
