import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { cacheTag, cacheLife } from "next/cache";
import { api } from "@/lib/server";
import { HealthUseCacheDisplay } from "./health-use-cache-display";

export const metadata: Metadata = {
  title: "React 19 - cache",
  description: "Server-side caching with use cache directive and tag-based revalidation in Next.js 16.",
};

async function getCachedHealth() {
  "use cache";
  cacheTag("health");
  cacheLife("minutes");
  const response = await api.health.get();
  return response.data;
}

function LoadingFallback() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}

export default async function UseCachePage() {
  await connection();

  const healthPromise = getCachedHealth();

  return (
    <>
      <h1 className="text-xl font-medium mb-1">cache</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Server-side caching with tag-based revalidation.
      </p>

      <Suspense fallback={<LoadingFallback />}>
        <HealthUseCacheDisplay promise={healthPromise} />
      </Suspense>
    </>
  );
}
