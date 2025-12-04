import type { Metadata } from "next";
import { Suspense } from "react";
import { api } from "@/lib/server";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "React Query - RSC",
};

async function HealthData() {
  const health = await api.health.get();
  return (
    <div className="bg-muted p-4 rounded-lg">
      <pre className="text-sm overflow-auto">
        {JSON.stringify(health.data, null, 2)}
      </pre>
    </div>
  );
}

export default function ServerPage() {
  return (
    <>
      <h1 className="text-xl font-medium mb-1">RSC</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Fetched on the server, no client JS needed.
      </p>

      <Suspense fallback={<Skeleton className="h-16 w-full bg-muted rounded-lg" />}>
        <HealthData />
      </Suspense>
    </>
  );
}
