import type { Metadata } from "next";
import { Suspense } from "react";
import { cacheTag, cacheLife } from "next/cache";
import { api } from "@/lib/server";
import { HealthUseCacheDisplay } from "./health-use-cache-display";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "React 19 - cache",
};

async function getCachedHealth() {
  "use cache";
  cacheTag("health");
  cacheLife("minutes");
  const response = await api.health.get();
  return response.data;
}

function LoadingSkeleton() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

export default function UseCachePage() {
  const healthPromise = getCachedHealth();

  return (
    <>
      <h1 className="text-xl font-medium mb-1">cache</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Server-side caching with tag-based revalidation.
      </p>

      <Suspense fallback={<LoadingSkeleton />}>
        <HealthUseCacheDisplay promise={healthPromise} />
      </Suspense>
    </>
  );
}
