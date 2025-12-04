"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

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
        <LoadingSkeleton />
      ) : error ? (
        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="text-sm text-destructive">Error: {(error as Error).message}</p>
        </div>
      ) : (
        <div className="bg-muted p-4 rounded-lg mb-4">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <Button onClick={() => refetch()} disabled={isFetching} size="sm" className="mt-4">
        {isFetching ? "Loading..." : "Refetch"}
      </Button>
    </>
  );
}
