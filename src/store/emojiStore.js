import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { noRefetchOptions } from "../lib/reactQueyOptions";

export const useGetByCategories = (categories) => {
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: categories.map((category) => {
      const cached = queryClient.getQueryData(["emoji", category]);

      return {
        queryKey: ["emoji", category],
        queryFn: async () => {
          const res = await axiosInstance.post("/emoji/getByCategories", [
            category,
          ]);
          return res.data.metadata.emojis;
        },
        enabled: !cached, // only fetch if not already cached
        initialData: cached, // use cached data immediately if available
        ...noRefetchOptions,
      };
    }),
  });

  // Combine data
  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const isSuccess = queries.every((q) => q.isSuccess); // all must succeed
  const error = queries.find((q) => q.isError)?.error;
  const data = queries.flatMap((q) => q.data || []);

  return { data, isLoading, isError, error, isSuccess };
};

export const useGetAllEmojis = () => {
  return useQuery({
    queryKey: ["Emojis"],
    queryFn: async () => {
      const res = await axiosInstance.get("/emoji/allEmojis");
      return res.data.metadata.emojis;
    },
    ...noRefetchOptions,
  });
};

export const useSearchEmojis = (searchQuery) => {
  return useQuery({
    queryKey: ["searchEmoji", searchQuery],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/emoji/search?searchQuery=${searchQuery}`
      );
      return res.data.metadata.emojis;
    },
    enabled: !!searchQuery, // optional: prevents query from firing with empty string
    ...noRefetchOptions,
  });
};

export const useGetAllCategoryCounts = () => {
  return useQuery({
    queryKey: ["emojisCount"],
    queryFn: async () => {
      const res = await axiosInstance.get("/emoji/categoryCounts");
      return res.data.metadata.categoryCounts;
    },
    ...noRefetchOptions,
  });
};
