import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";

export const getHistory = createAsyncThunk(
  "user/history/calorie",
  async ({ filteredData, page }, { rejectWithValue }) => {
    try {
      // const response = await userApi.post(
      //   `/history/assignment?page=${page - 1}&size=10`,
      //   JSON.stringify(filteredData)
      // );
      const response = await userApi.post(
        `/history/assignment`,
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
    status: "idle",
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
  },
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
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
    setResetHistoryFilter: (state, action) => {
      state.filteredData.foodName = null;
      state.filteredData.activityName = null;
      state.filteredData.date = null;
      state.dateString = "";
    },
    setDateString: (state, action) => {
      state.dateString = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.fulfilled, (state, action) => {
        state.userHistory = action.payload;
        state.totalPage = action.payload.totalPages;
        state.status = "succeeded";
      })
      .addCase(getHistory.pending, state => {
        state.status = "pending";
      })
      .addCase(getHistory.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const userCalorieHistoryActions = userCalorieHistorySlice.actions;

export default userCalorieHistorySlice.reducer;
