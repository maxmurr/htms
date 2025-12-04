import type { Metadata } from "next";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import { api } from "@/lib/server";
import { HEALTH_KEY } from "@/lib/swr/fetcher";
import { HealthDisplaySWRSuspense } from "./health-display-swr-suspense";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "SWR - Stream",
};

function LoadingSkeleton() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

async function PrefetchedHealth() {
  const healthData = await api.health.get().then((res) => res.data);
  return (
    <SWRConfig value={{ fallback: { [HEALTH_KEY]: healthData } }}>
      <HealthDisplaySWRSuspense />
    </SWRConfig>
  );
}

export default function SWRSuspensePage() {
  return (
    <>
      <h1 className="text-xl font-medium mb-1">Stream</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Server prefetch with SWR suspense mode.
      </p>

      <Suspense fallback={<LoadingSkeleton />}>
        <PrefetchedHealth />
      </Suspense>
    </>
  );
}
