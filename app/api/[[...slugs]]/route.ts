import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "Hello from Elysia!")
  .get("/health", async () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  })
  .post("/echo", async ({ request }) => {
    const body = await request.json();
    return body;
  });

export const GET = app.fetch;
export const POST = app.fetch;

// Export type for Eden client
export type App = typeof app;
