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
    addingStatus: "idle",
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
    setStatusNull: (state) => {
      state.addingStatus = "idle";
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
      .addCase(addingFoodRecord.fulfilled, (state) => {
        state.refresh = !state.refresh;
        state.isOpen = false;
        state.addingStatus = "succeeded";
      })
      .addCase(addingFoodRecord.pending, (state) => {
        state.addingStatus = "pending";
      })
      .addCase(addingFoodRecord.rejected, (state) => {
        state.addingStatus = "failed";
      });
  },
});

export const userAddingFoodActions = userAddingFoodSlice.actions;

export default userAddingFoodSlice.reducer;
