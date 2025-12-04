"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("SWR route error:", error);
  }, [error]);

  return (
    <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-destructive mb-2">
        Something went wrong
      </h3>
      <p className="text-xs text-muted-foreground mb-3">
        {error.message || "An unexpected error occurred"}
      </p>
      <Button onClick={reset} size="sm" variant="outline">
        Try again
      </Button>
    </div>
  );
}
