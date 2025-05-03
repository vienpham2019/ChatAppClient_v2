export const noRefetchOptions = {
  staleTime: Infinity, // don't mark data as stale
  cacheTime: 10 * 60 * 1000, // optional: 10 min cache retention
  refetchOnWindowFocus: false, // Prevent refetch on window focus
  refetchOnReconnect: false, // Prevent refetch on reconnect
  refetchOnMount: false, // Prevent refetch on mount
};
