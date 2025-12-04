import type { Metadata } from "next";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { healthQueryOptions } from "@/lib/queries";
import { HealthDisplay } from "./health-display";

export const metadata: Metadata = {
  title: "React Query - Hydrate",
  description: "Server-side prefetching with React Query HydrationBoundary for seamless client hydration.",
};

async function PrefetchedHealth() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(healthQueryOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HealthDisplay />
    </HydrationBoundary>
  );
}

function LoadingFallback() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}

export default function FullStackPage() {
  return (
    <>
      <h1 className="text-xl font-medium mb-1">Hydrate</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Prefetched on server, hydrated on client.
      </p>

      <Suspense fallback={<LoadingFallback />}>
        <PrefetchedHealth />
      </Suspense>
    </>
  );
}
