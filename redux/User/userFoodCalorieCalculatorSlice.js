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

export const getFilteredFoodsCalculator = createAsyncThunk(
  "user/getFilteredFood/calculator",
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
    foodStatus: "idle",
    filteredFoodStatus: "idle",
    calculateStatus: "idle",
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
    category: "",
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
      state.category = null;
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
    setResultNone: (state) => {
      state.calculationResult = 0;
    },
    setStatusNull: (state) => {
      state.foodStatus = "idle";
      state.filteredFoodStatus = "idle";
      state.calculateStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(foodCalculator.fulfilled, (state, action) => {
        state.refresh = !state.refresh;
        state.calculationResult = action.payload;
        state.calculateStatus = "succeeded";
      })
      .addCase(foodCalculator.pending, (state) => {
        state.calculateStatus = "pending";
      })
      .addCase(foodCalculator.rejected, (state, action) => {
        state.calculateStatus = "failed";
      })

      .addCase(getFoodsCalculator.fulfilled, (state, action) => {
        state.foods = action.payload.content;
        state.totalPage = action.payload.totalPages;
        state.foodStatus = "succeeded";
      })
      .addCase(getFoodsCalculator.pending, (state, action) => {
        state.foodStatus = "pending";
      })
      .addCase(getFoodsCalculator.rejected, (state, action) => {
        state.foodStatus = "failed";
      })

      .addCase(getFilteredFoodsCalculator.fulfilled, (state, action) => {
        state.foods = action.payload.content;
        state.totalPage = action.payload.totalPages;
        state.filteredFoodStatus = "succeeded";
      })
      .addCase(getFilteredFoodsCalculator.pending, (state, action) => {
        state.filteredFoodStatus = "pending";
      })
      .addCase(getFilteredFoodsCalculator.rejected, (state, action) => {
        state.filteredFoodStatus = "failed";
      })

      .addCase(getFoodCategoriesCalculator.fulfilled, (state, action) => {
        state.foodCategories = action.payload;
      })
      .addCase(getFoodCategoriesCalculator.rejected, (state, action) => {});
  },
});

export const userFoodCalorieCalculatorActions =
  userFoodCalorieCalculatorSlice.actions;

export default userFoodCalorieCalculatorSlice.reducer;
