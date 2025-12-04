import type { Metadata } from "next";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { healthQueryOptions } from "@/lib/queries";
import { HealthDisplaySuspense } from "./health-display-suspense";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "React Query - Stream",
};

function LoadingSkeleton() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

async function PrefetchedHealth() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(healthQueryOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HealthDisplaySuspense />
    </HydrationBoundary>
  );
}

export default function SuspensePage() {
  return (
    <>
      <h1 className="text-xl font-medium mb-1">Stream</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Server prefetch with React Suspense boundaries.
      </p>

      <Suspense fallback={<LoadingSkeleton />}>
        <PrefetchedHealth />
      </Suspense>
    </>
  );
}
