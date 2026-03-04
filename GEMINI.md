# GEMINI.md — RedditReach Operating Constitution

You are the AI engineer building **RedditReach**. Read `REDDITREACH_BUILD_GUIDE.md` for the full spec. This file tells you how to behave while building it.

---

## Package Manager

Always use `pnpm`. Always use `pnpx`. Never use `npm`, `npx`, or `yarn`. No exceptions.

```bash
pnpm add <package>
pnpm add -D <package>
pnpx <binary>
pnpm run dev / build / test / lint / typecheck
```

---

## Tech Stack

- **Framework:** Next.js 15 App Router, TypeScript, React 19
- **UI:** Tailwind CSS, shadcn/ui (New York style), Origin UI, Lucide React, Framer Motion
- **State:** Zustand + Immer (global), useState (local only)
- **Data fetching:** TanStack Query v5, React Hook Form + Zod
- **Backend:** Next.js API Routes, Supabase (DB + Auth + RLS), `@supabase/ssr`
- **AI:** Google Gemini 1.5 Pro via `@google/generative-ai` — server-side only, never in the browser
- **Payments:** Dodo Payments — follow https://docs.dodopayments.com for webhooks
- **Scraping:** Cheerio + Axios
- **Reddit data:** Public Reddit JSON API — no OAuth needed
- **Rate limiting:** Upstash Redis
- **Validation:** Zod everywhere — forms, API routes, external data
- **Testing:** Vitest + React Testing Library, Playwright for E2E

Do not introduce any library not listed here without a documented reason.

---

## TDD Cycle — Non-Negotiable

For every function, API route, or utility you build:

1. Write the test first — it should fail
2. Write the implementation — make it pass
3. Refactor if needed — keep it green
4. Never skip this cycle

Set up Vitest and Playwright in Phase 1 before any application code.

---

## Phase Discipline

Work through all 16 phases in order. Before moving to the next phase, run:

```bash
pnpm run typecheck   # zero errors
pnpm run lint        # zero errors
pnpm run test        # all pass
pnpm run build       # compiles clean
```

Fix failures before proceeding. Never carry broken code forward.

---

## Git Workflow

```bash
git checkout -b feature/phase-N-description   # one branch per phase
# build + test
git commit -m "Phase N: what was built and tested"
git checkout main && git merge feature/phase-N-description
```

Never commit directly to `main`. Never commit failing code.

---

## Code Rules

- All files are `.ts` or `.tsx` — no plain JavaScript
- No `any` types without a comment explaining why
- No business logic inside React components — it belongs in `lib/`, API routes, or hooks
- No server-only imports (`lib/supabase/admin.ts`, `lib/gemini.ts`) inside client components
- Add `"use client"` only when the file uses hooks, browser APIs, or event handlers
- All new types go in `types/index.ts` — import from there everywhere
- All secrets stay in `.env.local` only — also add placeholders to `.env.example`

---

## Critical Things to Always Remember

- `adminSupabase` (service role key) → API routes only, never in components
- Browser Supabase client → `createClient()` from `lib/supabase/client.ts`
- Server Supabase client → async `createClient()` from `lib/supabase/server.ts`
- Every API route authenticates with `supabase.auth.getUser()` before anything else — return 401 if not authenticated
- Dodo webhook → verify signature first, return 400 if it fails
- Reddit API → add 300ms delay between bulk requests to avoid rate limiting
- Free tier: 3 analyses/month, 3 results shown. Pro: 100/month, unlimited results. Agency: 500/month
- Define these limits as named constants, never hardcode them in logic
- TanStack Query keys follow the pattern `["entity-name", identifier]` — never reuse the same key for two different queries
- Zustand with Immer: mutate the draft directly inside `set()`, do not return a new object

---

## Error Handling

- Every async function has a try-catch or lets errors throw for the caller to handle
- API routes always return `{ error: string }` with a proper HTTP status on failure
- Never return raw error objects or stack traces to the client
- Never silently swallow errors — always log with `console.error`
- TanStack Query `onError` handlers must render something useful to the user

---

## Files You Must Never Modify

`GEMINI.md` and `REDDITREACH_BUILD_GUIDE.md` are read-only references. Do not edit or delete them.
