"use client";

import { useQuery } from "@tanstack/react-query";
import { healthQueryOptions } from "@/lib/queries";
import { Button } from "@/components/ui/button";

export function HealthDisplay() {
  const { data, isFetching, refetch } = useQuery(healthQueryOptions);

  return (
    <>
      <div className="bg-muted p-4 rounded-lg mb-4">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <Button onClick={() => refetch()} disabled={isFetching} size="sm">
        {isFetching ? "Loading..." : "Refetch"}
      </Button>
    </>
  );
}
