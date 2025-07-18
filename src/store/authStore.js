import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {
  errorToast,
  successToast,
  waringToast,
} from "../components/CustomToast";
import { io } from "socket.io-client";

const initActionState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  socket: null,
};

export const useAuthStore = create((set, get) => ({
  token: null,
  ...initActionState,

  verifyRefreshToken: async () => {
    try {
      const res = await axiosInstance.get("/auth/refresh");
      set({ token: res.data.metadata });
    } catch (error) {
      waringToast({
        title: "Authenticate",
        message: error.response?.data?.message,
      });
      throw new Error(error.response?.data?.message);
    }
  },

  logIn: async ({ payload, navigate }) => {
    try {
      const res = await axiosInstance.post("/auth/logIn", payload);
      set({
        token: res.data.metadata,
      });
      successToast({ title: "LogIn", message: res.data.message });
      get().connectSocket();
      navigate("/");
    } catch (error) {
      errorToast({ title: "Login", message: error.response?.data?.message });
      throw new Error(error.response?.data?.message);
    }
  },

  signUp: async ({ payload, navigate }) => {
    try {
      const res = await axiosInstance.post("/auth/signUp", payload);
      successToast({ title: "SignUp", message: res.data.message });
      navigate("/login");
    } catch (error) {
      errorToast({ title: "SignUp", message: error.response?.data?.message });
      throw new Error(error.response?.data?.message);
    }
  },

  logOut: async ({ navigate }) => {
    try {
      await axiosInstance.get("/auth/logOut");
      set({
        token: null,
      });
      successToast({ title: "LogOut", message: "LogOut Success" });
      get().disconnectSocket();
      navigate("/login");
    } catch (error) {
      errorToast({ title: "LogOut", message: error.response?.data?.message });
      throw new Error(error.response?.data?.message);
    }
  },

  connectSocket: () => {
    const socket = io("http://localhost:5001", {
      transports: ["websocket"],
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });
  },
  disconnectSocket: () => {},
}));
