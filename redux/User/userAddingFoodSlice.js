import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";

export const addingFoodRecord = createAsyncThunk(
  "user/addingFoods",
  async (foodRecord, { rejectWithValue }) => {
    try {
      const response = await userApi.post(
        "/addFoodRecord",
        JSON.stringify(foodRecord)
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

export const userAddingFoodSlice = createSlice({
  name: "userAddingFood",
  initialState: {
    status: "idle",
    error: null,
    isOpen: false,
    foodRecord: {
      food: {
        id: null,
      },
      mass: null,
    },
    refresh: true,
  },
  reducers: {
    setIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setAddingFoodId: (state, action) => {
      state.foodRecord.food.id = action.payload;
    },
    setAddingFoodMass: (state, action) => {
      state.foodRecord.mass = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setFoodRecordNull: (state) => {
      state.foodRecord = {
        food: {
          id: null,
        },
        mass: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addingFoodRecord.fulfilled, (state, action) => {
        state.refresh = !state.refresh;
        state.isOpen = false;
        state.status = "succeeded";
      })
      .addCase(addingFoodRecord.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addingFoodRecord.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const userAddingFoodActions = userAddingFoodSlice.actions;

export default userAddingFoodSlice.reducer;
