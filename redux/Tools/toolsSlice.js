import { createSlice } from "@reduxjs/toolkit";

export const toolsSlice = createSlice({
  name: "tools",
  initialState: {
    status: "idle",
    error: null,
    tableName: "Food",
    foodModal: false,
    activityModal: false,
    filterModal: false,
    foodFilterModal: false,
  },
  reducers: {
    setTableName: (state, action) => {
      state.tableName = action.payload;
    },
    setFoodModalVisible: (state) => {
      state.foodModal = !state.foodModal;
    },
    setActivityModalVisible: (state) => {
      state.activityModal = !state.activityModal;
    },
    setFilterModalVisible: (state, action) => {
      state.filterModal = action.payload;
    },
    setFoodFilterModalVisible: (state) => {
      state.foodFilterModal = !state.foodFilterModal;
    },
  },
});

export const toolsActions = toolsSlice.actions;

export default toolsSlice.reducer;
