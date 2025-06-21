import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: "GalleryModal",
};

export const modalEnum = {
  CustomEmojiModal: "CustomEmojiModal",
  GalleryModal: "GalleryModal",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal(state, action) {
      state.showModal = action.payload;
    },

    setCloseModal(state) {
      state.showModal = null;
    },
  },
});

export const { setShowModal, setCloseModal } = modalSlice.actions;
export default modalSlice.reducer;
