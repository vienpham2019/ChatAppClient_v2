import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { noRefetchOptions } from "../lib/reactQueyOptions";

export const useGetChatRoomInfo = (chatRoomId) => {
  return useQuery({
    queryKey: ["chatRoom", chatRoomId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/chatRoom/info/${chatRoomId}`);
      return res.data.metadata;
    },
    enabled: !!chatRoomId, // optional: prevents query from firing with empty string
    ...noRefetchOptions,
  });
};
