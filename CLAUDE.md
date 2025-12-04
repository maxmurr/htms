# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev                      # Start development server (localhost:3000)
bun build                    # Production build
bun lint                     # Run ESLint
bun typecheck                # TypeScript type checking
bun test:unit                # Run Vitest unit tests
bun test:integration         # Run Cypress component tests (headless)
bun test:integration:open    # Open Cypress component test runner
```

## Architecture

This is a Next.js 16 demo showcasing data fetching patterns with React Query, SWR, and React 19.

### API Layer (Elysia + Eden)

- **API routes**: `app/api/[[...slugs]]/route.ts` - Elysia server with catch-all handler
- **Type-safe clients**: `lib/client.ts` (browser) and `lib/server.ts` (RSC) use Eden treaty for end-to-end type safety
- The `App` type exported from the API route enables full autocomplete on API calls

### Data Fetching Patterns

Each pattern lives in its own route under `app/`:

| Route | Pattern | Description |
|-------|---------|-------------|
| `/react-query/server` | RSC | Server Component fetch, no client JS |
| `/react-query/client` | Hook | Client-side `useQuery` |
| `/react-query/fullstack` | Hydrate | Server prefetch + `HydrationBoundary` |
| `/react-query/suspense` | Stream | `useSuspenseQuery` with streaming |
| `/swr/client` | Hook | Client-side `useSWR` |
| `/swr/fullstack` | Fallback | Server prefetch with `SWRConfig` fallback |
| `/swr/suspense` | Stream | SWR suspense mode |
| `/react/use-hook` | use() | React 19 native promise unwrapping |
| `/react/use-cache` | cache | `"use cache"` directive with `cacheTag`/`cacheLife` |

### Key Configuration

- **Cache Components**: `cacheComponents: true` in `next.config.ts` - pages accessing uncached data must wrap async fetches in Suspense boundaries
- **React Compiler**: Enabled via `reactCompiler: true`
- **Typed Routes**: `typedRoutes: true` for type-safe `Link` href

### Route Groups

- `app/(home)/` - Home page route group (separates layout with metadata from page component for Cypress compatibility)

## Commit Messages

Before committing changes, **ALWAYS** use the `@.claude/skills/generating-commit-messages` skill to generate commit messages. Never include AI attribution lines.
