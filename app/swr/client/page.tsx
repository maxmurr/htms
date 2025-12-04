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

      <Button onClick={() => mutate()} disabled={isValidating} size="sm">
        {isValidating ? "Loading..." : "Revalidate"}
      </Button>
    </>
  );
}
