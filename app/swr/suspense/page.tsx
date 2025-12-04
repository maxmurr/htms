import type { Metadata } from "next";
import { Suspense } from "react";
import { SWRConfig } from "swr";
import { api } from "@/lib/server";
import { HEALTH_KEY } from "@/lib/swr/fetcher";
import { HealthDisplaySWRSuspense } from "./health-display-swr-suspense";

export const metadata: Metadata = {
  title: "SWR - Stream",
  description: "Streaming data with SWR suspense mode for progressive server-side rendering.",
};

function LoadingFallback() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">Loading...</p>
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

      <Suspense fallback={<LoadingFallback />}>
        <PrefetchedHealth />
      </Suspense>
    </>
  );
}
