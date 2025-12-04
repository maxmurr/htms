import { Skeleton } from "@/components/ui/skeleton";

export default function SWRLoading() {
  return (
    <>
      <Skeleton className="h-7 w-24 mb-1" />
      <Skeleton className="h-5 w-64 mb-6" />
      <div className="bg-muted p-4 rounded-lg">
        <Skeleton className="h-16 w-full" />
      </div>
    </>
  );
}
