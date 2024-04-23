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
    status: "idle",
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
        state.status = "succeeded";
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(getActivityCategories.fulfilled, (state, action) => {
        state.activityCategories = action.payload;
        state.status = "succeeded";
      })
      .addCase(getActivityCategories.rejected, (state, action) => {
        state.status = "failed";
      })
  },
});

export const userGettingActivityActions = userGettingActivitySlice.actions;

export default userGettingActivitySlice.reducer;
