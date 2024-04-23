import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";

export const getUserGraphs = createAsyncThunk(
  "user/userGraphs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get("/caloriesHistory");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userCalorieGraphSlice = createSlice({
  name: "userGraph",
  initialState: {
    status: "idle",
    error: null,
    userGraphs: {},
  },
  reducers: {
    setUserGraph: (state) => {
      state.userGraphs = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGraphs.fulfilled, (state, action) => {
        state.userGraphs = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUserGraphs.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserGraphs.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const userCalorieGraphActions = userCalorieGraphSlice.actions;

export default userCalorieGraphSlice.reducer;
