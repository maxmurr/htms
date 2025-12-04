"use client";

import { use, useState, useTransition } from "react";
import { api } from "@/lib/client";
import { Button } from "@/components/ui/button";

type HealthData = {
  status: string;
  timestamp: string;
} | null;

export function HealthUseDisplay({
  promise,
}: {
  promise: Promise<HealthData>;
}) {
  const health = use(promise);
  const [localData, setLocalData] = useState<HealthData | null>(null);
  const [isPending, startTransition] = useTransition();

  const displayData = localData ?? health;

  const handleRefetch = () => {
    startTransition(async () => {
      const response = await api.health.get();
      setLocalData(response.data);
    });
  };

  return (
    <>
      <div className="bg-muted p-4 rounded-lg mb-4">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(displayData, null, 2)}
        </pre>
      </div>

      <Button onClick={handleRefetch} disabled={isPending} size="sm">
        {isPending ? "Loading..." : "Refetch"}
      </Button>
    </>
  );
}
