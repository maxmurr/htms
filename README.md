# HTMS - Data Fetching Patterns

A Next.js 16 project demonstrating various data fetching patterns with React Query, SWR, and React 19.

## Patterns

### React Query

- **RSC** - Pure React Server Component fetch
- **Hook** - Client-side useQuery
- **Hydrate** - Server prefetch + client hydration
- **Stream** - Suspense streaming

### SWR

- **Hook** - Client-side useSWR
- **Fallback** - Server prefetch with SWRConfig fallback
- **Stream** - Suspense mode

### React 19

- **use()** - Native promise unwrapping
- **cache** - `use cache` directive with tag-based revalidation

## Setup

```bash
# Install dependencies
bun install

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 16
- React 19
- React Query
- SWR
- Elysia (API)
- Tailwind CSS
- shadcn/ui
