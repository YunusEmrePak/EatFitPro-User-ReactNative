import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import foodAndActivityApi from "../apis/foodAndActivityApi";
import userApi from "../apis/userApi";

export const getFoods = createAsyncThunk(
  "user/getFood",
  async ({ filteredData, page }, { rejectWithValue }) => {
    try {
      const response = await foodAndActivityApi.post(
        `/food?page=${page - 1}&size=20`,
        JSON.stringify(filteredData)
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

export const getFoodCategories = createAsyncThunk(
  "user/categories/food",
  async (_, { rejectWithValue }) => {
    try {
      const response = await foodAndActivityApi.get(`categories/food`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userGettingFoodSlice = createSlice({
  name: "userGettingFoodSlice",
  initialState: {
    status: "idle",
    error: null,
    nullFilteredData: {
      name: "",
      caloriesLowerBound: null,
      caloriesUpperBound: null,
      foodCategoryName: null,
    },
    filteredData: {
      name: "",
      caloriesLowerBound: null,
      caloriesUpperBound: null,
      foodCategoryName: null,
    },
    foodCategories: [],
    foods: [],
    totalPage: 0,
    pageNumber: 1,
    category: null,
    isReset: false,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setName: (state, action) => {
      state.filteredData.name = action.payload;
    },
    setFoodCategoryName: (state, action) => {
      state.filteredData.foodCategoryName = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setFilteredDataNull: (state) => {
      state.filteredData = {
        name: "",
        caloriesLowerBound: null,
        caloriesUpperBound: null,
        foodCategoryName: null,
      };
      state.category = ""
    },
    setIsReset: (state) => {
      state.isReset = !state.isReset;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.fulfilled, (state, action) => {
        state.foods = action.payload.content;
        state.totalPage = action.payload.totalPages;
        state.status = "succeeded";
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getFoodCategories.fulfilled, (state, action) => {
        state.foodCategories = action.payload;
        state.status = "succeeded";
      })
      .addCase(getFoodCategories.rejected, (state, action) => {
        state.status = "failed";
      })

  },
});

export const userGettingFoodActions = userGettingFoodSlice.actions;

export default userGettingFoodSlice.reducer;
