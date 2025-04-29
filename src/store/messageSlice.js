import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSubEditMenu: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setShowSubEditMenu(state, action) {
      state.showSubEditMenu = action.payload;
    },
  },
});

export const { setShowSubEditMenu } = messageSlice.actions;
export default messageSlice.reducer;
