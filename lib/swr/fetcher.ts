import { api } from "@/lib/client";

export const healthFetcher = async () => {
  const response = await api.health.get();
  return response.data;
};

export const HEALTH_KEY = "/api/health";
