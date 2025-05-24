import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { noRefetchOptions } from "../lib/reactQueyOptions";

export const useGetUserProfile = (userId) => {
  return useQuery({
    queryKey: ["UserProfile", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/userProfile/${userId}`);
      const user = res.data.metadata.user;
      if (!user) throw new Error("User not found");
      return user;
    },
    enabled: !!userId, // only run when userId exists
    ...noRefetchOptions,
  });
};
