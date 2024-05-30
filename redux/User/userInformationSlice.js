import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../apis/userApi";

export const getUserInfo = createAsyncThunk(
  "user/userInfo",
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

export const getUserCalorieInfo = createAsyncThunk(
  "user/userCalorieInfo",
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
 
export const setUpdatedInformation = createAsyncThunk(
  "user/userUpdatedInfo",
  async (userUpdatedInformation, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/update", JSON.stringify(userUpdatedInformation));
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
 
export const setUpdatedName = createAsyncThunk(
  "user/userUpdatedName",
  async (userUpdatedInformation, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/update", JSON.stringify(userUpdatedInformation));
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userInformationSlice = createSlice({
  name: "userInformation",
  initialState: {
    infoStatus: "idle",
    calorieStatus: "idle",
    updatedUserInformationStatus: "idle",
    updatedUserNameStatus: "idle",
    error: null,
    userInformation: {},
    userCalorieInformation: {},
    userFoodList: [],
    userActivityList: [],
    updatedUserInformation: {
      name: null,
      surname: null,
      email: null,
      length: null,
      age: null,
      weight: null,
    },
  },
  reducers: {
    setUpdatedName: (state, action) => {
      state.updatedUserInformation.name = action.payload;
    },
    setUpdatedSurname: (state, action) => {
      state.updatedUserInformation.surname = action.payload;
    },
    setUpdatedLength: (state, action) => {
      state.updatedUserInformation.length = action.payload;
    },
    setUpdatedAge: (state, action) => {
      state.updatedUserInformation.age = action.payload;
    },
    setUpdatedWeight: (state, action) => {
      state.updatedUserInformation.weight = action.payload;
    },
    setUpdatedEmail: (state, action) => {
      state.updatedUserInformation.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInformation = action.payload;
        state.updatedUserInformation.name = action.payload.name;
        state.updatedUserInformation.surname = action.payload.surname;
        state.updatedUserInformation.length = action.payload.length;
        state.updatedUserInformation.email = action.payload.email;
        state.updatedUserInformation.weight = action.payload.weight;
        state.updatedUserInformation.age = action.payload.age;
        state.infoStatus = "succeeded";
      })
      .addCase(getUserInfo.pending, (state) => {
        state.infoStatus = "pending";
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.infoStatus = "failed";
      })

      .addCase(getUserCalorieInfo.fulfilled, (state, action) => {
        state.userCalorieInformation = action.payload;
        state.userFoodList = action.payload.foodDtoList;
        state.userActivityList = action.payload.activityDtoList;
        state.calorieStatus = "succeeded";
      })
      .addCase(getUserCalorieInfo.pending, (state) => {
        state.calorieStatus = "pending";
      })
      .addCase(getUserCalorieInfo.rejected, (state, action) => {
        state.calorieStatus = "failed";
      })

      .addCase(setUpdatedInformation.fulfilled, (state) => {
        state.updatedUserInformationStatus = "succeeded";
      })
      .addCase(setUpdatedInformation.pending, (state) => {
        state.updatedUserInformationStatus = "pending";
      })
      .addCase(setUpdatedInformation.rejected, (state) => {
        state.updatedUserInformationStatus = "failed";
      })

      .addCase(setUpdatedName.fulfilled, (state) => {
        state.updatedUserNameStatus = "succeeded";
      })
      .addCase(setUpdatedName.pending, (state) => {
        state.updatedUserNameStatus = "pending";
      })
      .addCase(setUpdatedName.rejected, (state) => {
        state.updatedUserNameStatus = "failed";
      });
  },
});

export const userInformationActions = userInformationSlice.actions;

export default userInformationSlice.reducer;
