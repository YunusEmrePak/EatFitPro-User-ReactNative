import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import foodAndActivityApi from "../apis/foodAndActivityApi";
import userApi from "../apis/userApi";

export const foodCalculator = createAsyncThunk(
  "user/foodCalculatorr",
  async (foodRecord, { rejectWithValue }) => {
    try {
      const response = await userApi.post(
        "/food/calculate",
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

export const getFoodsCalculator = createAsyncThunk(
  "user/getFood/calculator",
  async ({ filteredData, page }, { rejectWithValue }) => {
    try {
      const response = await foodAndActivityApi.post(
        `/food?page=${page - 1}&size=50`,
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

export const getFoodCategoriesCalculator = createAsyncThunk(
  "user/categories/food/calculator",
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

export const userFoodCalorieCalculatorSlice = createSlice({
  name: "userFoodCalculator",
  initialState: {
    status: "idle",
    error: null,
    isOpen: false,
    foodRecord: {
      foodDto: {
        id: null,
      },
      mass: null,
    },
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
    refresh: true,
    calculationResult: 0,
  },
  reducers: {
    setFoodCalculatorId: (state, action) => {
      state.foodRecord.foodDto.id = action.payload;
    },
    setFoodCalculatorMass: (state, action) => {
      state.foodRecord.mass = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setFoodRecordNull: (state) => {
      state.foodRecord = {
        foodDto: {
          id: null,
        },
        mass: null,
      };
    },
    setFilteredDataNull: (state) => {
      state.filteredData = {
        name: "",
        caloriesLowerBound: null,
        caloriesUpperBound: null,
        foodCategoryName: null,
      };
    },
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
    setResultNone: (state, action) => {
      state.calculationResult = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(foodCalculator.fulfilled, (state, action) => {
        state.refresh = !state.refresh;
        state.calculationResult = action.payload;
        state.status = "succeeded";
      })
      .addCase(foodCalculator.pending, (state) => {
        state.status = "pending";
      })
      .addCase(foodCalculator.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getFoodsCalculator.fulfilled, (state, action) => {
        state.foods = action.payload.content;

        state.totalPage = action.payload.totalPages;
        state.status = "succeeded";
      })
      .addCase(getFoodsCalculator.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getFoodCategoriesCalculator.fulfilled, (state, action) => {
        state.foodCategories = action.payload;
        state.status = "succeeded";
      })
      .addCase(getFoodCategoriesCalculator.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const userFoodCalorieCalculatorActions =
  userFoodCalorieCalculatorSlice.actions;

export default userFoodCalorieCalculatorSlice.reducer;
