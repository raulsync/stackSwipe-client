import { createSlice } from "@reduxjs/toolkit";

const connectionSLice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return null;
    },
  },
});

export const { addConnection, removeConnection } = connectionSLice.actions;

export default connectionSLice.reducer;
