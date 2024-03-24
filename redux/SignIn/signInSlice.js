import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { toast } from "react-toastify";

import signApi from "../apis/signApi";

import axios from "axios";

import * as SecureStore from "expo-secure-store";

import { getToken } from "../../utils/getToken";

export const signIn = createAsyncThunk(
  "user/signIn",
  async (userInfo, thunkAPI) => {
    try {
      console.log(userInfo);
      //   const response = await signApi.post(
      //     "/auth/signin",
      //     JSON.stringify(userInfo)
      //   );
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth/signin",
        userInfo
      );
      console.log(response.data);
      SecureStore.setItemAsync("bearerToken", response.data.token);
      //   Cookies.set('bearerToken', response.data.token, { expires: 60 });
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
    // token: getToken(),
    token: "",
    status: "idle",
    error: null,
    userInformation: {
      email: "",
      password: "",
    },
    isClickedToSignInButton: false,
    eyeIsClicked: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.userInformation.email = action.payload;
    },
    setPassword: (state, action) => {
      state.userInformation.password = action.payload;
    },
    signOut: (state) => {
      state.token = null;
      state.status = "idle";
      SecureStore.deleteItemAsync("bearerToken");
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = SecureStore.getItemAsync("bearerToken");
        console.log("succeeded");
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
