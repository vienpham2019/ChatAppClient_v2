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

  getAllCategories: async () => {
    try {
      const res = await axiosInstance.get("/emoji/categories");
      return res.data.metadata.categories;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  },
}));
