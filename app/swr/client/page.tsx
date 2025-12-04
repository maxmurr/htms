"use client";

import useSWR from "swr";
import { healthFetcher, HEALTH_KEY } from "@/lib/swr/fetcher";
import { Button } from "@/components/ui/button";

export default function SWRClientPage() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    HEALTH_KEY,
    healthFetcher
  );

  return (
    <>
      <h1 className="text-xl font-medium mb-1">Hook</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Fetched on the client with SWR caching.
      </p>

      <div className="bg-muted p-4 rounded-lg mb-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-sm text-destructive">Error: {(error as Error).message}</p>
        ) : (
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>

      <Button onClick={() => mutate()} disabled={isValidating} size="sm">
        {isValidating ? "Loading..." : "Revalidate"}
      </Button>
    </>
  );
}
