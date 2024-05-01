import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";

export const predictCalories = createAsyncThunk(
  "user/predict",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get("/predict");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userCaloriePredictorSlice = createSlice({
  name: "userPredict",
  initialState: {
    status: "idle",
    error: null,
    prediction: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(predictCalories.fulfilled, (state, action) => {
        state.prediction = action.payload;
        state.status = "succeeded";
      })
      .addCase(predictCalories.pending, (state) => {
        state.status = "pending";
      })
      .addCase(predictCalories.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const userCaloriePredictorActions = userCaloriePredictorSlice.actions;

export default userCaloriePredictorSlice.reducer;
