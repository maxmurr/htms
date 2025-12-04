import type { Metadata } from "next";
import { Suspense } from "react";
import { api } from "@/lib/server";
import { HealthUseDisplay } from "./health-use-display";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "React 19 - use()",
};

function LoadingSkeleton() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

async function HealthPromiseWrapper() {
  const healthPromise = api.health.get().then((res) => res.data);
  return <HealthUseDisplay promise={healthPromise} />;
}

export default function UseHookPage() {
  return (
    <>
      <h1 className="text-xl font-medium mb-1">use()</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Native React 19 promise unwrapping.
      </p>

      <Suspense fallback={<LoadingSkeleton />}>
        <HealthPromiseWrapper />
      </Suspense>
    </>
  );
}
