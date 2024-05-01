import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";
import foodAndActivityApi from "../apis/foodAndActivityApi";

export const setUserGoal = createAsyncThunk(
  "user/set/goal",
  async (goal, { rejectWithValue }) => {
    try {
      const response = await userApi.get(`/set/goal?goal=${goal}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserGoal = createAsyncThunk(
  "user/get/goal",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get(`/get/dailyGoal`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLeaderboard = createAsyncThunk(
  "user/get/leaderboard",
  async (page, { rejectWithValue }) => {
    try {
      const response = await foodAndActivityApi.get(
        `/leaderboard?page=${page - 1}&size=10`
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

export const getGoalUserInfo = createAsyncThunk(
  "user/userInfos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get("/info");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getGoalUserCalorieInfo = createAsyncThunk(
  "user/userCalorieInfoo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.get("/assignment");
      return response.data;
    } catch (error) { 
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userAddGoalSlice = createSlice({
  name: "userAddGoalSlice",
  initialState: {
    addGoalStatus: "idle",
    getGoalStatus: "idle",
    getLeaderboardStatus: "idle",
    infoStatus: "idle",
    calorieStatus: "idle",
    error: null,
    userInformation: [],
    setGoal: 0,
    dailyGoal: 0,
    calorieBalance: 0,
    refresh: false,
    leaderboard: [],
    userInfo: [],
    totalPage: 0,
    pageNumber: 1,
  },
  reducers: {
    setGoal: (state, action) => {
      state.setGoal = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setCalorieBalance: (state, action) => {
      state.calorieBalance = action.payload;
    },
    setDailyGoal: (state, action) => {
      state.dailyGoal = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserGoal.fulfilled, (state, action) => {
        state.addGoalStatus = "succeeded";
        state.dailyGoal = action.payload.data.goal;
      })
      .addCase(setUserGoal.pending, (state) => {
        state.addGoalStatus = "pending";
      })
      .addCase(setUserGoal.rejected, (state, action) => {
        state.addGoalStatus = "failed";
      })

      .addCase(getUserGoal.fulfilled, (state, action) => {
        state.getGoalStatus = "succeeded";
        state.userInformation = action.payload;
        state.calorieBalance = action.payload.data
          ? action.payload.data.calorieBalance
          : 0;
      })
      .addCase(getUserGoal.pending, (state, action) => {
        state.getGoalStatus = "pending";
      })
      .addCase(getUserGoal.rejected, (state, action) => {
        state.getGoalStatus = "failed";
      })

      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.getLeaderboardStatus = "succeeded";
        state.leaderboard = action.payload.data.content;
        state.totalPage = action.payload.data.totalPages;
      })
      .addCase(getLeaderboard.pending, (state) => {
        state.getLeaderboardStatus = "pending";
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.getLeaderboardStatus = "failed";
      })

      .addCase(getGoalUserInfo.fulfilled, (state, action) => {
        state.infoStatus = "succeeded";
        state.dailyGoal = action.payload.goal;
      })
      .addCase(getGoalUserInfo.pending, (state) => {
        state.infoStatus = "pending";
      })
      .addCase(getGoalUserInfo.rejected, (state, action) => {
        state.infoStatus = "failed";
      })

      .addCase(getGoalUserCalorieInfo.fulfilled, (state, action) => {
        state.calorieStatus = "succeeded";
        // state.calorieBalance = action.payload.goal;
      })
      .addCase(getGoalUserCalorieInfo.pending, (state) => {
        state.calorieStatus = "pending";
      })
      .addCase(getGoalUserCalorieInfo.rejected, (state, action) => {
        state.calorieStatus = "failed";
      });
  },
});

export const userAddGoalActions = userAddGoalSlice.actions;

export default userAddGoalSlice.reducer;
