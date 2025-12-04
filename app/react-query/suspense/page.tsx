import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { healthQueryOptions } from "@/lib/queries";
import { HealthDisplaySuspense } from "./health-display-suspense";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

export default async function SuspensePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(healthQueryOptions);

  return (
    <>
      <h1 className="text-xl font-medium mb-1">Stream</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Server prefetch with React Suspense boundaries.
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingSkeleton />}>
          <HealthDisplaySuspense />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
