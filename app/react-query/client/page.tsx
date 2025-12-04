"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/client";
import { Button } from "@/components/ui/button";

export default function ClientPage() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await api.health.get();
      return response.data;
    },
  });

  return (
    <>
      <h1 className="text-xl font-medium mb-1">Hook</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Fetched on the client with React Query caching.
      </p>

      {isLoading ? (
        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg mb-4">
          <h3 className="text-sm font-medium text-destructive mb-2">
            Something went wrong
          </h3>
          <p className="text-xs text-muted-foreground">
            {(error as Error).message || "An unexpected error occurred"}
          </p>
        </div>
      ) : (
        <div className="bg-muted p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <Button onClick={() => refetch()} disabled={isFetching} size="sm">
        {isFetching ? "Loading..." : "Refetch"}
      </Button>
    </>
  );
}
