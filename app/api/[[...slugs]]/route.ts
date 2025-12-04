import { Elysia } from "elysia";

// Simulate network latency for demo purposes
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "Hello from Elysia!")
  .get("/health", async () => {
    await delay(1000); // 1 second delay
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  })
  .post("/echo", async ({ request }) => {
    await delay(500); // 0.5 second delay
    const body = await request.json();
    return body;
  });

export const GET = app.fetch;
export const POST = app.fetch;

// Export type for Eden client
export type App = typeof app;
