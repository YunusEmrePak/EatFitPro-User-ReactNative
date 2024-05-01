import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import foodAndActivityApi from "../apis/foodAndActivityApi";

export const getActivities = createAsyncThunk(
  "user/getActivity",
  async ({ filteredData, page }, { rejectWithValue }) => {
    try {
      const response = await foodAndActivityApi.post(
        `/activity?page=${page - 1}&size=20`,
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

export const getFilteredActivities = createAsyncThunk(
  "user/getFilteredActivity",
  async ({ filteredData, page }, { rejectWithValue }) => {
    try {
      const response = await foodAndActivityApi.post(
        `/activity?page=${page - 1}&size=20`,
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

export const getActivityCategories = createAsyncThunk(
  "user/categories/activity",
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

export const userGettingActivitySlice = createSlice({
  name: "userGettingActivitySlice",
  initialState: {
    activityStatus: "idle",
    filteredActivityStatus: "idle",
    categoryStatus: "idle",
    error: null,
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
  },
  reducers: {
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
    setStatusNull: (state) => {
      state.activityStatus = "idle";
      state.filteredActivityStatus = "idle";
      state.categoryStatus = "idle";
    },
    setFilteredDataNull: (state) => {
      state.filteredData = {
        name: "",
        calories: null,
        activityCategoryName: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActivities.fulfilled, (state, action) => {
        state.activities = action.payload.content;
        state.totalPage = action.payload.totalPages;
        state.activityStatus = "succeeded";
      })
      .addCase(getActivities.pending, (state, action) => {
        state.activityStatus = "pending";
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.activityStatus = "failed";
      })

      .addCase(getFilteredActivities.fulfilled, (state, action) => {
        state.activities = action.payload.content;
        state.totalPage = action.payload.totalPages;
        state.filteredActivityStatus = "succeeded";
      })
      .addCase(getFilteredActivities.pending, (state, action) => {
        state.filteredActivityStatus = "pending";
      })
      .addCase(getFilteredActivities.rejected, (state, action) => {
        state.filteredActivityStatus = "failed";
      })

      .addCase(getActivityCategories.fulfilled, (state, action) => {
        state.activityCategories = action.payload;
        state.categoryStatus = "succeeded";
      })
      .addCase(getActivityCategories.pending, (state, action) => {
        state.categoryStatus = "pending";
      })
      .addCase(getActivityCategories.rejected, (state, action) => {
        state.categoryStatus = "failed";
      })
  },
});

export const userGettingActivityActions = userGettingActivitySlice.actions;

export default userGettingActivitySlice.reducer;
