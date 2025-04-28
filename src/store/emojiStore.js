import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const initActionState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

export const useEmojiStore = create((set) => ({
  ...initActionState,

  getByCategories: async (categories) => {
    try {
      const res = await axiosInstance.post(
        "/emoji/getByCategories",
        categories
      );
      return res.data.metadata.emojis;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  },

  searchEmojis: async (searchQuery) => {
    try {
      const res = await axiosInstance.get(
        `/emoji/search?searchQuery=${searchQuery}`
      );
      return res.data.metadata.emojis;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  },

  getAllCategoryCounts: async () => {
    try {
      const res = await axiosInstance.get("/emoji/categoryCounts");
      return res.data.metadata.categoryCounts;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  },
}));
