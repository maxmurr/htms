import type { Metadata } from "next";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { healthQueryOptions } from "@/lib/queries";
import { HealthDisplay } from "./health-display";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "React Query - Hydrate",
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

export default function FullStackPage() {
  return (
    <>
      <h1 className="text-xl font-medium mb-1">Hydrate</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Prefetched on server, hydrated on client.
      </p>

      <Suspense fallback={<Skeleton className="h-16 w-full bg-muted rounded-lg" />}>
        <PrefetchedHealth />
      </Suspense>
    </>
  );
}
