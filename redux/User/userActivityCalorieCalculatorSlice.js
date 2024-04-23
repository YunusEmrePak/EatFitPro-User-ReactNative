import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";
import foodAndActivityApi from "../apis/foodAndActivityApi";

export const activityCalculator = createAsyncThunk(
  "user/activityCalculator",
  async (activityRecord, { rejectWithValue }) => {
    try {
      const response = await userApi.post(
        "/activity/calculate",
        JSON.stringify(activityRecord)
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

export const getActivitiesCalculator = createAsyncThunk(
  "user/getActivityy",
  async ({ filteredData, page }, { rejectWithValue }) => {
    try {
      const response = await foodAndActivityApi.post(
        `/activity?page=${page - 1}&size=50`,
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

export const getActivityCategoriesCalculator = createAsyncThunk(
  "user/categories/activityy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await foodAndActivityApi.get(`categories/activity`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userActivityCalorieCalculatorSlice = createSlice({
  name: "userActivityCalorieCalculatorSlice",
  initialState: {
    status: "idle",
    error: null,
    activityRecord: {
      activityId: null,
      duration: null,
      heartRate: 0,
      bodyTemp: 0,
    },
    nullFilteredData: {
      name: "",
      calories: null,
      activityCategoryName: "",
    },
    filteredData: {
      name: "",
      calories: null,
      activityCategoryName: "",
    },
    activityCategories: [],
    activities: [],
    totalPage: 0,
    pageNumber: 1,
    category: null,
    calculationResult: 0,
    refresh: true,
  },
  reducers: {
    setActivityCalculatorId: (state, action) => {
      state.activityRecord.activityId = action.payload;
    },
    setActivityCalculatorDuration: (state, action) => {
      state.activityRecord.duration = action.payload;
    },
    setActivityCalculatorHeartRate: (state, action) => {
      state.activityRecord.heartRate = action.payload;
    },
    setActivityCalculatorBodyTemp: (state, action) => {
      state.activityRecord.bodyTemp = action.payload;
    },
    setActivityRecordNull: (state) => {
      state.activityRecord = {
        activityId: null,
        duration: null,
        heartRate: null,
        bodyTemp: null,
      };
    },
    setFilteredDataNull: (state) => {
      state.filteredData = {
        name: "",
        calories: null,
        activityCategoryName: "",
      };
      state.category = null;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setName: (state, action) => {
      state.filteredData.name = action.payload;
    },
    setActivityCategoryName: (state, action) => {
      state.filteredData.activityCategoryName = action.payload;
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
      .addCase(activityCalculator.fulfilled, (state, action) => {
        state.refresh = !state.refresh;
        state.calculationResult = action.payload;
        state.status = "succeeded";
      })
      .addCase(activityCalculator.pending, (state) => {
        state.status = "pending";
      })
      .addCase(activityCalculator.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getActivitiesCalculator.fulfilled, (state, action) => {
        state.activities = action.payload.content;
        state.totalPage = action.payload.totalPages;
        state.status = "succeeded";
      })
      .addCase(getActivitiesCalculator.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getActivityCategoriesCalculator.fulfilled, (state, action) => {
        state.activityCategories = action.payload;
        state.status = "succeeded";
      })
      .addCase(getActivityCategoriesCalculator.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const userActivityCalorieCalculatorActions =
  userActivityCalorieCalculatorSlice.actions;

export default userActivityCalorieCalculatorSlice.reducer;
