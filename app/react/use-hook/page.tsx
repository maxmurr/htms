import type { Metadata } from "next";
import { Suspense } from "react";
import { api } from "@/lib/server";
import { HealthUseDisplay } from "./health-use-display";

export const metadata: Metadata = {
  title: "React 19 - use()",
  description: "Native promise unwrapping with React 19 use() hook for simplified async data handling.",
};

function LoadingFallback() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">Loading...</p>
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

      <Suspense fallback={<LoadingFallback />}>
        <HealthPromiseWrapper />
      </Suspense>
    </>
  );
}
