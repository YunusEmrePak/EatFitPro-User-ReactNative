import { createSlice } from "@reduxjs/toolkit";

export const toolsSlice = createSlice({
  name: "tools",
  initialState: {
    status: "idle",
    error: null,
    tableName: "Food",
  },
  reducers: {
    setTableName: (state, action) => {
      state.tableName = action.payload;
    },
  },
});

export const toolsActions = toolsSlice.actions;

export default toolsSlice.reducer;
