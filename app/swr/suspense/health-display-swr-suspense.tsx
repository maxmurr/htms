"use client";

import useSWR from "swr";
import { healthFetcher, HEALTH_KEY } from "@/lib/swr/fetcher";
import { Button } from "@/components/ui/button";

export function HealthDisplaySWRSuspense() {
  const { data, mutate, isValidating } = useSWR(HEALTH_KEY, healthFetcher, {
    suspense: true,
  });

  return (
    <>
      <div className="bg-muted p-4 rounded-lg mb-4">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <Button onClick={() => mutate()} disabled={isValidating} size="sm">
        {isValidating ? "Loading..." : "Revalidate"}
      </Button>
    </>
  );
}
