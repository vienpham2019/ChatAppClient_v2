import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messageSlice";
import modalReducer from "./modalSlice";
import chatRoomReducer from "./chatRoomSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    modal: modalReducer,
    chatRoom: chatRoomReducer,
  },
});
