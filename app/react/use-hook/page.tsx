import { Suspense } from "react";
import { api } from "@/lib/server";
import { HealthUseDisplay } from "./health-use-display";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

export default function UseHookPage() {
  const healthPromise = api.health.get().then((res) => res.data);

  return (
    <>
      <h1 className="text-xl font-medium mb-1">use()</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Native React 19 promise unwrapping.
      </p>

      <Suspense fallback={<LoadingSkeleton />}>
        <HealthUseDisplay promise={healthPromise} />
      </Suspense>
    </>
  );
}
