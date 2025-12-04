import { queryOptions } from "@tanstack/react-query";
import { api } from "./client";

export const healthQueryOptions = queryOptions({
  queryKey: ["health"],
  queryFn: async () => {
    const response = await api.health.get();
    return response.data;
  },
  staleTime: 1000 * 60,
  retry: false,
});
