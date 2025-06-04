import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentChatRoomId,
  users,
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setState(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setState } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
