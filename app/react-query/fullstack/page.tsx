import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { healthQueryOptions } from "@/lib/queries";
import { HealthDisplay } from "./health-display";

export default async function FullStackPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(healthQueryOptions);

  return (
    <>
      <h1 className="text-xl font-medium mb-1">Hydrate</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Prefetched on server, hydrated on client.
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <HealthDisplay />
      </HydrationBoundary>
    </>
  );
}
