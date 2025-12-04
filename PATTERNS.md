# Data Fetching Patterns: Analysis

A comprehensive analysis of each data fetching pattern implemented in this project, covering performance characteristics, user experience implications, and developer experience trade-offs.

---

## Overview

| Pattern | First Load | Refetch | Bundle | Caching | Complexity |
|---------|-----------|---------|--------|---------|------------|
| RQ Server | Instant | Page reload | None | None | Low |
| RQ Client | Delayed | Smooth | ~13kb | Client | Medium |
| RQ Full-Stack | Instant | Smooth | ~13kb | Both | High |
| RQ Suspense | Streaming | Smooth | ~13kb | Client | Medium |
| React use() | Instant | Manual | None | None | Low |
| React use cache | Instant | Server action | None | Server | Low |
| SWR Client | Delayed | Smooth | ~5kb | Client | Low |
| SWR Full-Stack | Instant | Smooth | ~5kb | Both | Medium |
| SWR Suspense | Streaming | Smooth | ~5kb | Client | Low |

---

## React Query Patterns

### 1. Server-Side Only

```tsx
// Server Component - no client JS
const data = await api.health.get();
return <pre>{JSON.stringify(data)}</pre>;
```

#### Performance

| Metric | Rating | Notes |
|--------|--------|-------|
| Time to First Byte | ⚡ Fast | Data fetched before HTML sent |
| First Contentful Paint | ⚡ Fast | Data in initial HTML |
| Bundle Size Impact | ✅ Zero | No client-side library |
| Caching | ❌ None | Each request hits origin |
| Network Waterfalls | ✅ None | Single server request |

**Best for:** Static content, SEO-critical pages, low-interactivity pages.

#### UX/UI

| Aspect | Rating | Notes |
|--------|--------|-------|
| Initial Load | ✅ Excellent | No loading spinners |
| Data Freshness | ⚠️ Stale | Only fresh on navigation |
| Refetch Experience | ❌ Poor | Requires page reload |
| Optimistic Updates | ❌ None | Not possible |
| Offline Support | ❌ None | Requires server |

**User perception:** Fast initial load, but feels "static" - users can't refresh data without navigating away and back.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Simplicity | ✅ Excellent | Just async/await |
| Type Safety | ✅ Excellent | End-to-end types |
| Debugging | ⚠️ Limited | Server logs only |
| Testing | ✅ Easy | Standard async testing |
| Learning Curve | ✅ Low | Basic async patterns |

```tsx
// Simple, readable, predictable
export default async function Page() {
  const data = await api.health.get();
  return <div>{data.status}</div>;
}
```

---

### 2. Client-Side Only

```tsx
"use client";
const { data, isLoading } = useQuery(queryOptions);
```

#### Performance

| Metric | Rating | Notes |
|--------|--------|-------|
| Time to First Byte | ✅ Fast | HTML sent immediately |
| First Contentful Paint | ❌ Delayed | Shows loading state first |
| Bundle Size Impact | ⚠️ ~13kb | React Query core |
| Caching | ✅ Excellent | Stale-while-revalidate |
| Network Waterfalls | ❌ Yes | HTML → JS → Fetch |

**The waterfall problem:**
```
1. Browser requests page         [----]
2. Server sends HTML             [----]
3. Browser parses, loads JS           [--------]
4. React hydrates                          [----]
5. useQuery fires                              [----]
6. Data arrives, renders                           [----]
```

**Best for:** Dashboards, admin panels, highly interactive pages where instant initial load isn't critical.

#### UX/UI

| Aspect | Rating | Notes |
|--------|--------|-------|
| Initial Load | ⚠️ Loading state | Spinner/skeleton visible |
| Data Freshness | ✅ Excellent | Auto-refetch on focus |
| Refetch Experience | ✅ Excellent | Smooth, no page reload |
| Optimistic Updates | ✅ Supported | Via mutation callbacks |
| Offline Support | ✅ Possible | With persistence plugins |

**User perception:** Slightly slower initial load, but feels responsive and "alive" after that.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Simplicity | ✅ Good | Familiar hooks pattern |
| Type Safety | ✅ Excellent | Inferred from queryFn |
| Debugging | ✅ Excellent | React Query DevTools |
| Testing | ⚠️ Medium | Need QueryClientProvider |
| Learning Curve | ⚠️ Medium | Many options to learn |

**React Query DevTools** provide real-time visibility into cache state, making debugging straightforward.

---

### 3. Full-Stack (Prefetch + Hydrate)

```tsx
// Server: prefetch and dehydrate
const queryClient = new QueryClient();
await queryClient.prefetchQuery(queryOptions);

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <ClientComponent />
  </HydrationBoundary>
);
```

#### Performance

| Metric | Rating | Notes |
|--------|--------|-------|
| Time to First Byte | ⚠️ Slightly delayed | Waits for prefetch |
| First Contentful Paint | ✅ Fast | Data in dehydrated state |
| Bundle Size Impact | ⚠️ ~13kb + state | Library + serialized cache |
| Caching | ✅ Excellent | Server → Client handoff |
| Network Waterfalls | ✅ Eliminated | Data travels with HTML |

**How hydration works:**
```
Server:
1. prefetchQuery() fills server QueryClient
2. dehydrate() serializes cache to JSON
3. JSON embedded in HTML

Client:
1. HydrationBoundary reads JSON
2. Client QueryClient populated
3. useQuery returns cached data instantly
4. Background revalidation starts
```

**Best for:** Production apps needing both SEO and interactivity.

#### UX/UI

| Aspect | Rating | Notes |
|--------|--------|-------|
| Initial Load | ✅ Excellent | Data visible immediately |
| Data Freshness | ✅ Excellent | Background revalidation |
| Refetch Experience | ✅ Excellent | Smooth client updates |
| Optimistic Updates | ✅ Supported | Full React Query features |
| Offline Support | ✅ Possible | Cache persists |

**User perception:** Best of both worlds - fast like server rendering, interactive like SPA.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Simplicity | ⚠️ Complex | Multiple moving parts |
| Type Safety | ✅ Excellent | Shared queryOptions |
| Debugging | ✅ Good | DevTools after hydration |
| Testing | ⚠️ Complex | Need to test both paths |
| Learning Curve | ❌ High | Hydration is nuanced |

**Gotchas:**
- Must use same `queryKey` on server and client
- `staleTime` must account for server→client delay
- Serialization issues with Dates, Maps, etc.

---

### 4. Suspense Mode

```tsx
// Triggers Suspense boundary while loading
const { data } = useSuspenseQuery(queryOptions);
```

#### Performance

| Metric | Rating | Notes |
|--------|--------|-------|
| Time to First Byte | ✅ Fast | Streaming starts immediately |
| First Contentful Paint | ✅ Progressive | Content streams in |
| Bundle Size Impact | ⚠️ ~13kb | Same as client-side |
| Caching | ✅ Excellent | Same React Query cache |
| Network Waterfalls | ⚠️ Depends | On Suspense boundaries |

**Streaming advantage:**
```
Traditional:        [====wait for all data====][render all]
With Suspense:      [shell][stream data 1][stream data 2][stream data 3]
```

**Best for:** Pages with multiple independent data requirements.

#### UX/UI

| Aspect | Rating | Notes |
|--------|--------|-------|
| Initial Load | ✅ Progressive | Shell loads first |
| Data Freshness | ✅ Excellent | Same as client-side |
| Refetch Experience | ✅ Excellent | Smooth transitions |
| Optimistic Updates | ✅ Supported | Full React Query |
| Loading States | ✅ Declarative | Suspense fallbacks |

**User perception:** Page appears quickly, content "fills in" progressively.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Simplicity | ✅ Excellent | No isLoading checks |
| Type Safety | ✅ Excellent | data is never undefined |
| Debugging | ✅ Good | Clear Suspense boundaries |
| Testing | ⚠️ Medium | Need Suspense in tests |
| Learning Curve | ⚠️ Medium | Suspense mental model |

**The key benefit:** `data` is guaranteed to exist (no `undefined` check needed):
```tsx
// Without Suspense
const { data } = useQuery(opts);
if (!data) return <Loading />;  // Must handle undefined
return <div>{data.value}</div>;

// With Suspense
const { data } = useSuspenseQuery(opts);
return <div>{data.value}</div>;  // data always exists
```

---

## React 19 Native Patterns

### 5. use() Hook

```tsx
// Server Component passes promise
const promise = api.health.get();
return <ClientComponent promise={promise} />;

// Client Component unwraps
const data = use(promise);
```

#### Performance

| Metric | Rating | Notes |
|--------|--------|-------|
| Time to First Byte | ✅ Fast | Promise starts on server |
| First Contentful Paint | ✅ Fast | Streams with Suspense |
| Bundle Size Impact | ✅ Zero | Native React |
| Caching | ❌ None | No built-in cache |
| Network Waterfalls | ✅ Eliminated | Promise created on server |

**Promise timing advantage:**
```
Traditional client-side:
  Server: send HTML
  Client: parse → hydrate → create promise → wait → render

With use():
  Server: create promise, send HTML with promise
  Client: parse → hydrate → unwrap already-pending promise → render
```

**Best for:** Simple data fetching without complex caching needs.

#### UX/UI

| Aspect | Rating | Notes |
|--------|--------|-------|
| Initial Load | ✅ Fast | Data starts loading on server |
| Data Freshness | ⚠️ Manual | Must implement refetch |
| Refetch Experience | ⚠️ Manual | Local state management |
| Optimistic Updates | ⚠️ Manual | Possible but DIY |
| Loading States | ✅ Suspense | Native integration |

**User perception:** Fast initial load, but refetch requires custom implementation.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Simplicity | ✅ Simple | Native React patterns |
| Type Safety | ✅ Excellent | Promise types flow through |
| Debugging | ⚠️ Limited | No specialized DevTools |
| Testing | ✅ Easy | Just async testing |
| Learning Curve | ✅ Low | It's just promises |

**Trade-off:** Simplicity vs. features. No library means no library features:
```tsx
// You get this for free
const data = use(promise);

// You must build these yourself
- Caching
- Background revalidation
- Retry logic
- Optimistic updates
- DevTools
```

---

### 6. use cache Directive

```tsx
async function getData() {
  "use cache";
  cacheTag("health");
  return await api.health.get();
}

// Revalidate with server action
async function revalidate() {
  "use server";
  revalidateTag("health");
}
```

#### Performance

| Metric | Rating | Notes |
|--------|--------|-------|
| Time to First Byte | ⚡ Fastest | Cached on server edge |
| First Contentful Paint | ⚡ Fastest | Pre-computed HTML |
| Bundle Size Impact | ✅ Zero | Server-only |
| Caching | ✅ Excellent | Server-side, tagged |
| Network Waterfalls | ✅ None | Cache hit = instant |

**Cache behavior:**
```
First request:    [fetch origin]───[cache result]───[return]
Subsequent:       [cache hit]───[return instantly]
After revalidate: [fetch origin]───[update cache]───[return]
```

**Best for:** Data that changes infrequently, high-traffic pages.

#### UX/UI

| Aspect | Rating | Notes |
|--------|--------|-------|
| Initial Load | ⚡ Instant | From cache |
| Data Freshness | ⚠️ Controlled | Tag-based revalidation |
| Refetch Experience | ✅ Good | Server action triggers |
| Optimistic Updates | ❌ Limited | Server round-trip |
| Loading States | ✅ useTransition | Pending states |

**User perception:** Extremely fast loads, revalidation is async but predictable.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Simplicity | ✅ Excellent | Just directives |
| Type Safety | ✅ Excellent | Server functions typed |
| Debugging | ⚠️ Medium | Cache inspection limited |
| Testing | ⚠️ Medium | Need to test cache behavior |
| Learning Curve | ⚠️ Medium | New mental model |

**Cache control is explicit and powerful:**
```tsx
async function getData() {
  "use cache";
  cacheLife("hours");        // Cache for hours
  cacheTag("data", "user");  // Multiple tags
  return await fetch(...);
}

// Surgical invalidation
revalidateTag("user");  // Only user-tagged caches
```

---

## SWR Patterns

### 7. Client-Side

```tsx
const { data, isLoading } = useSWR(key, fetcher);
```

#### Performance

| Metric | Rating | Notes |
|--------|--------|-------|
| Time to First Byte | ✅ Fast | HTML immediate |
| First Contentful Paint | ❌ Delayed | Loading state |
| Bundle Size Impact | ✅ ~5kb | Smaller than RQ |
| Caching | ✅ Excellent | Stale-while-revalidate |
| Network Waterfalls | ❌ Yes | Same as RQ client |

**Best for:** Lightweight apps prioritizing bundle size.

#### UX/UI

Same characteristics as React Query client-side, with identical UX trade-offs.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Simplicity | ✅ Excellent | Minimal API surface |
| Type Safety | ✅ Good | Generic support |
| Debugging | ⚠️ Limited | No official DevTools |
| Testing | ✅ Easy | Simple mocking |
| Learning Curve | ✅ Very Low | Few concepts |

**SWR philosophy:** Do one thing well.
```tsx
// This is basically the entire API
const { data, error, isLoading, mutate } = useSWR(key, fetcher);
```

---

### 8. Full-Stack (Fallback)

```tsx
<SWRConfig value={{ fallback: { [key]: serverData } }}>
  <Component />
</SWRConfig>
```

#### Performance

Same as React Query full-stack, with slightly simpler hydration.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Code Simplicity | ✅ Simpler | Just fallback prop |
| Setup Required | ✅ Minimal | No dehydrate step |
| Mental Model | ✅ Clear | "Fallback" is intuitive |

**Simpler than React Query hydration:**
```tsx
// SWR: just provide fallback
<SWRConfig value={{ fallback: { [key]: data } }}>

// React Query: dehydrate/hydrate dance
<HydrationBoundary state={dehydrate(queryClient)}>
```

---

### 9. Suspense Mode

```tsx
const { data } = useSWR(key, fetcher, { suspense: true });
```

#### Performance

Same as React Query Suspense.

#### DX

| Aspect | Rating | Notes |
|--------|--------|-------|
| Enabling Suspense | ✅ Trivial | Just add option |
| Code Changes | ✅ None | Same useSWR call |

**Simplest Suspense integration:**
```tsx
// Without Suspense
useSWR(key, fetcher)

// With Suspense
useSWR(key, fetcher, { suspense: true })
```

---

## Decision Matrix

### Choose by Priority

| If you prioritize... | Choose |
|---------------------|--------|
| Smallest bundle | React use() or use cache |
| Fastest initial load | use cache |
| Best refetch UX | React Query Full-Stack |
| Simplest code | SWR Client or Server-only |
| Most features | React Query Full-Stack |
| Latest React patterns | use cache + use() |
| Team familiarity | Whatever team knows |

### Choose by Use Case

| Use Case | Recommended | Why |
|----------|-------------|-----|
| Marketing pages | use cache | Cached, no JS, fast |
| E-commerce product | RQ Full-Stack | SEO + interactivity |
| Dashboard | SWR Client | Simple, real-time |
| Blog | Server-only | Static, SEO |
| Real-time feed | RQ Suspense | Streaming, fresh |
| Admin panel | RQ Client | Features > speed |
| Mobile-first | SWR | Smallest bundle |

### Performance vs Complexity

```
                    HIGH PERFORMANCE
                          │
         use cache ───────┼─────── RQ Full-Stack
                          │
                          │
    Server-only ──────────┼─────── RQ Suspense
                          │
                          │
         SWR Client ──────┼─────── RQ Client
                          │
    LOW ──────────────────┼────────────────── HIGH
       COMPLEXITY         │               COMPLEXITY
                          │
                    LOW PERFORMANCE
```

---

## Summary

**For most production apps:** React Query Full-Stack offers the best balance—fast initial loads with full client-side capabilities.

**For simpler needs:** SWR provides 80% of the functionality with a smaller footprint.

**For the future:** `use cache` represents the direction React and Next.js are heading—server-centric with surgical client interactivity.

**The honest truth:** Any of these patterns will work. Pick based on your team's familiarity and your specific requirements. Premature optimization of data fetching is rarely the bottleneck.
