import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { noRefetchOptions } from "../lib/reactQueyOptions";

export const useGetAllMessage = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["Message"], // Just tempt key not catching any data
    queryFn: async () => {
      const res = await axiosInstance.get("/message/all");
      const messages = res.data.metadata.messages;
      messages.forEach((message) => {
        queryClient.setQueryData(["Message", message.id], message);
      });
      return messages;
    },
    ...noRefetchOptions,
  });
};

export const useGetMessageById = (id) => {
  return useQuery({
    queryKey: ["Message", id], // Unique per message
    queryFn: async () => {
      const res = await axiosInstance.get(`/message/${id}`);
      const message = res.data.metadata.message;
      if (!message) throw new Error("Message not found");
      return message;
    },
    enabled: !!id, // only fetch if id is provided
  });
};
