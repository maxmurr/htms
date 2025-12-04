"use client";

import { use, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { revalidateHealth } from "./actions";

type HealthData = {
  status: string;
  timestamp: string;
} | null;

export function HealthUseCacheDisplay({
  promise,
}: {
  promise: Promise<HealthData>;
}) {
  const health = use(promise);
  const [isPending, startTransition] = useTransition();

  const handleRevalidate = () => {
    startTransition(async () => {
      await revalidateHealth();
    });
  };

  return (
    <>
      <div className="bg-muted p-4 rounded-lg mb-4">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(health, null, 2)}
        </pre>
      </div>

      <Button onClick={handleRevalidate} disabled={isPending} size="sm">
        {isPending ? "Loading..." : "Revalidate"}
      </Button>
    </>
  );
}
