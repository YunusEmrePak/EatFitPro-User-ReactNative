import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";

export const addingActivityRecord = createAsyncThunk(
  "user/getActivities",
  async (activityRecord, { rejectWithValue }) => {
    try {
      const response = await userApi.post(
        "/addActivityRecord",
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

export const userAddingActivitySlice = createSlice({
  name: "userAddingActivity",
  initialState: {
    status: "idle",
    error: null,
    isOpen: false,
    activityRecord: {
      activityId: null,
      duration: null,
      heartRate: 0,
      bodyTemp: 0,
    },
    refresh: true,
  },
  reducers: {
    setIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setAddingActivityId: (state, action) => {
      state.activityRecord.activityId = action.payload;
    },
    setAddingActivityDuration: (state, action) => {
      state.activityRecord.duration = action.payload;
    },
    setAddingActivityHeartRate: (state, action) => {
      state.activityRecord.heartRate = action.payload;
    },
    setAddingActivityBodyTemp: (state, action) => {
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
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addingActivityRecord.fulfilled, (state, action) => {
        state.refresh = !state.refresh;
        state.isOpen = false;
        state.status = "succeeded";
      })
      .addCase(addingActivityRecord.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addingActivityRecord.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const userAddingActivityActions = userAddingActivitySlice.actions;

export default userAddingActivitySlice.reducer;
