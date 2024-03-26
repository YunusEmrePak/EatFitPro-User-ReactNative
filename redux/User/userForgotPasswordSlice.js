import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import signApi from "../apis/signApi";

export const sendEmail = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await signApi.post(
        "/auth/reset/code",
        JSON.stringify(email)
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "userr/changePasswordd",
  async (information, { rejectWithValue }) => {
    try {
      const response = await signApi.post(
        "/auth/reset/password",
        JSON.stringify(information)
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userForgotPasswordSlice = createSlice({
  name: "userForgotPassword",
  initialState: {
    emailStatus: "idle",
    changeStatus: "idle",
    emailIsSuccessful: null,
    changeIsSuccessful: null,
    error: null,
    codeEmail: {
      email: null,
    },
    changePassword: {
      email: null,
      password: null,
      code: null,
    },
    confirmPassword: null,
    isClickedToFirstPage: false,
    isClickedToSecondPage: false,
    eyeIsClicked: false,
  },
  reducers: {
    setCodeEmail: (state, action) => {
      state.codeEmail.email = action.payload;
    },
    setEmail: (state, action) => {
      state.changePassword.email = action.payload;
    },
    setPassword: (state, action) => {
      state.changePassword.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setCode: (state, action) => {
      state.changePassword.code = action.payload;
    },
    setIsClickedToFirstPage: (state) => {
      state.isClickedToFirstPage = !state.isClickedToFirstPage;
    },
    setIsClickedToSecondPage: (state) => {
      state.isClickedToSecondPage = !state.isClickedToSecondPage;
    },
    setResetStatus: (state) => {
      state.emailStatus = "idle";
      state.changeStatus = "idle";
    },
    setEyeIsClicked: (state) => {
      state.eyeIsClicked = !state.eyeIsClicked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.emailStatus = "succeeded";
        state.emailIsSuccessful = action.payload.isSuccessful;
      })
      .addCase(sendEmail.pending, (state) => {
        state.emailStatus = "pending";
      })
      .addCase(sendEmail.rejected, (state) => {
        state.emailStatus = "error";
      })

      .addCase(changePassword.fulfilled, (state, action) => {
        state.changeStatus = "succeeded";
        state.changeIsSuccessful = action.payload.isSuccessful;
      })
      .addCase(changePassword.pending, (state) => {
        state.changeStatus = "pending";
      })
      .addCase(changePassword.rejected, (state) => {
        state.changeStatus = "error";
      });
  },
});

export const userForgotPasswordActions = userForgotPasswordSlice.actions;

export default userForgotPasswordSlice.reducer;
