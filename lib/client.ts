import { treaty } from "@elysiajs/eden";
import type { App } from "@/app/api/[[...slugs]]/route";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = treaty<App>(apiUrl).api;
