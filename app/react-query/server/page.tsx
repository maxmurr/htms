import { api } from "@/lib/server";

export default async function ServerPage() {
  const health = await api.health.get();

  return (
    <>
      <h1 className="text-xl font-medium mb-1">RSC</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Fetched on the server, no client JS needed.
      </p>

      <div className="bg-muted p-4 rounded-lg">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(health.data, null, 2)}
        </pre>
      </div>
    </>
  );
}
