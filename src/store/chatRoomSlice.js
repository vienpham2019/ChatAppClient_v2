import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentChatRoomId: null,
  users: {},
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setChatRoomState(state, action) {
      const { key, value } = action.payload;

      state[key] = value;
    },
  },
});

export const { setChatRoomState } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
