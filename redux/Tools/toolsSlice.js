import { createSlice } from "@reduxjs/toolkit";

export const toolsSlice = createSlice({
  name: "tools",
  initialState: {
    status: "idle",
    error: null,
    tableName: "Food",
    foodModal: false,
    activityModal: false,
  },
  reducers: {
    setTableName: (state, action) => {
      state.tableName = action.payload;
    },
    setFoodModalVisible: (state, action) => {
      state.foodModal = !state.foodModal;
    },
    setActivityModalVisible: (state, action) => {
      state.activityModal = !state.activityModal;
    },
  },
});

export const toolsActions = toolsSlice.actions;

export default toolsSlice.reducer;
