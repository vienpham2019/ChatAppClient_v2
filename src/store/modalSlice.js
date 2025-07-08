import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: "GalleryModal",
  contents: null,
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

    setModalContents(state, action) {
      state.contents = action.payload;
    },

    setCloseModal(state) {
      state.showModal = null;
      state.contents = null;
    },
  },
});

export const { setShowModal, setCloseModal, setModalContents } =
  modalSlice.actions;
export default modalSlice.reducer;
