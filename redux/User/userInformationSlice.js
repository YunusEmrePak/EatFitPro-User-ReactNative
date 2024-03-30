import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";

export const getUserInfo = createAsyncThunk(
  "user/userInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get("/info");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserCalorieInfo = createAsyncThunk(
  "user/userCalorieInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get("/assignment");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userInformationSlice = createSlice({
  name: "userInformation",
  initialState: {
    infoStatus: "idle",
    calorieStatus: "idle",
    error: null,
    userInformation: {},
    userCalorieInformation: {},
    userFoodList: [],
    userActivityList: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInformation = action.payload;
        state.infoStatus = "succeeded";
      })
      .addCase(getUserInfo.pending, (state) => {
        state.infoStatus = "pending";
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.infoStatus = "failed";
      })

      .addCase(getUserCalorieInfo.fulfilled, (state, action) => {
        state.userCalorieInformation = action.payload;
        state.userFoodList = action.payload.foodDtoList;
        state.userActivityList = action.payload.activityDtoList;
        state.calorieStatus = "succeeded";
      })
      .addCase(getUserCalorieInfo.pending, (state) => {
        state.calorieStatus = "pending";
      })
      .addCase(getUserCalorieInfo.rejected, (state, action) => {
        state.calorieStatus = "failed";
      });
  },
});

export const userInformationActions = userInformationSlice.actions;

export default userInformationSlice.reducer;
