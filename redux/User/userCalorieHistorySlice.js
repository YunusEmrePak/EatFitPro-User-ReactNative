import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";

export const getHistory = createAsyncThunk(
  "user/history/calorie",
  async ({ filteredData, page }, { rejectWithValue }) => {
    try {
      const response = await userApi.post(
        `/history/assignment?page=${page - 1}&size=3`,
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

export const getFilteredHistory = createAsyncThunk(
  "user/filteredHistory/calorie",
  async ({ filteredData, page }, { rejectWithValue }) => {
    try {
      const response = await userApi.post(
        `/history/assignment?page=${page - 1}&size=3`,
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

export const userCalorieHistorySlice = createSlice({
  name: "userCalorieInfo",
  initialState: {
    historyStatus: "idle",
    filteredHistoryStatus: "idle",
    error: null,
    userHistory: [],
    filteredData: {
      foodName: null,
      activityName: null,
      date: null,
    },
    nullFilteredData: {
      foodName: null,
      activityName: null,
      date: null,
    },
    pageNumber: 1,
    totalPage: 0,
    isClicked: false,
    dateString: "",
    isEnded: false,
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = state.pageNumber + 1;
    },
    setFoodName: (state, action) => {
      state.filteredData.foodName = action.payload;
    },
    setActivityName: (state, action) => {
      state.filteredData.activityName = action.payload;
    },
    setDate: (state, action) => {
      state.filteredData.date = action.payload;
    },
    setClicked: (state, action) => {
      state.isClicked = !state.isClicked;
    },
    setStatusNull: (state, action) => {
      state.historyStatus = "idle";
    },
    setResetHistoryFilter: (state, action) => {
      state.filteredData.foodName = null;
      state.filteredData.activityName = null;
      state.filteredData.date = null;
      state.dateString = "";
    },
    setDateString: (state, action) => {
      state.dateString = action.payload;
    },
    setIsEnded: (state, action) => {
      state.isEnded = !state.isEnded;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.fulfilled, (state, action) => {
        state.userHistory = action.payload.content;
        // state.userHistory = state.userHistory.concat(action.payload.content);
        state.totalPage = action.payload.totalPages;
        state.historyStatus = "succeeded";
      })
      .addCase(getHistory.pending, (state) => {
        state.historyStatus = "pending";
      })
      .addCase(getHistory.rejected, (state) => {
        state.historyStatus = "failed";
      })

      .addCase(getFilteredHistory.fulfilled, (state, action) => {
        state.userHistory = action.payload;
        state.totalPage = action.payload.totalPages;
        state.filteredHistoryStatus = "succeeded";
      })
      .addCase(getFilteredHistory.pending, (state) => {
        state.filteredHistoryStatus = "pending";
      })
      .addCase(getFilteredHistory.rejected, (state) => {
        state.filteredHistoryStatus = "failed";
      });
  },
});

export const userCalorieHistoryActions = userCalorieHistorySlice.actions;

export default userCalorieHistorySlice.reducer;
