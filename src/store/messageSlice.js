import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubPopoverOpen: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setIsSubPopoverOpen(state, action) {
      state.isSubPopoverOpen = action.payload;
    },
  },
});

export const { setIsSubPopoverOpen } = messageSlice.actions;
export default messageSlice.reducer;
