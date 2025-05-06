import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messageSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    modal: modalReducer,
  },
});
