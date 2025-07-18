import { useQueries, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { noRefetchOptions } from "../lib/reactQueyOptions";
import { io } from "socket.io-client";

const fetchUserProfile = async (userId) => {
  const res = await axiosInstance.get(`/user/userProfile/${userId}`);
  const user = res.data.metadata.user;
  if (!user) throw new Error("User not found");
  const socket = io(process.env.BASE_URL);
  socket.connect();
  return user;
};

export const useGetUsersProfile = (userIds = []) => {
  return useQueries({
    queries: userIds.map((userId) => ({
      queryKey: ["UserProfile", userId],
      queryFn: () => fetchUserProfile(userId),
      enabled: !!userId,
    })),
  });
};

export const useGetUserProfile = (userId) => {
  return useQuery({
    queryKey: ["UserProfile", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId, // only run when userId exists
    ...noRefetchOptions,
  });
};
