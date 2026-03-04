# RedditReach — Complete Gemini CLI Build Guide

## AI-Powered Reddit Marketing & Discovery Platform

> **IMPORTANT FOR GEMINI CLI:** Read this entire document before writing a single line of code. Execute every phase in strict order. Do not skip steps. Each phase has checkpoints — only proceed when all checkpoints pass. When in doubt, re-read the relevant section.

---

## Table of Contents

1. [Project Vision & Goals](#1-project-vision--goals)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Folder Structure](#3-folder-structure)
4. [Environment Setup](#4-environment-setup)
5. [Phase 1 — Project Scaffolding](#phase-1--project-scaffolding)
6. [Phase 2 — Supabase Database Schema](#phase-2--supabase-database-schema)
7. [Phase 3 — Authentication System](#phase-3--authentication-system)
8. [Phase 4 — Core Library Layer](#phase-4--core-library-layer)
9. [Phase 5 — API Routes (Backend)](#phase-5--api-routes-backend)
10. [Phase 6 — State Management (Zustand)](#phase-6--state-management-zustand)
11. [Phase 7 — Data Fetching Layer (TanStack Query)](#phase-7--data-fetching-layer-tanstack-query)
12. [Phase 8 — UI Component Library](#phase-8--ui-component-library)
13. [Phase 9 — Landing Page](#phase-9--landing-page)
14. [Phase 10 — Dashboard Pages](#phase-10--dashboard-pages)
15. [Phase 11 — Core Feature Pages](#phase-11--core-feature-pages)
16. [Phase 12 — Payments (Dodo Payments)](#phase-12--payments-dodo-payments)
17. [Phase 13 — Freemium Logic & Credit System](#phase-13--freemium-logic--credit-system)
18. [Phase 14 — Advanced Features](#phase-14--advanced-features)
19. [Phase 15 — Polish, SEO & Performance](#phase-15--polish-seo--performance)
20. [Phase 16 — Testing & QA Checklist](#phase-16--testing--qa-checklist)
21. [Feature Spec Sheet](#feature-spec-sheet)
22. [UI/UX Design System](#uiux-design-system)

---

## 1. Project Vision & Goals

### What is RedditReach?

RedditReach is a SaaS platform where users paste their website URL and the system:

1. **Scrapes and understands** the product/service from the website using AI
2. **Searches Reddit** for threads and posts where that product is relevant
3. **Scores and ranks** each Reddit opportunity by relevance, engagement potential, and audience fit
4. **Drafts human-sounding replies** using Gemini AI that help users comment without getting shadowbanned
5. **Manages a workspace** of saved threads, draft replies, posting schedules, and analytics

### Core Differentiators from Okara.ai

- **Deeper AI context:** We don't just keyword-match — we understand pain points, use cases, and audience psychology from the website
- **Shadowban protection scoring:** Every reply is graded on Reddit-safe language patterns before the user sees it
- **Multi-tone variations:** Users get 3 reply styles (helpful expert, casual peer, storyteller) for every thread
- **Subreddit culture awareness:** AI adapts tone per subreddit (r/startups vs r/entrepreneur vs r/SaaS have different norms)
- **Opportunity scoring dashboard:** Visual scoring of each Reddit thread with clear reasoning
- **Reply history & tracking:** Know which threads you've commented on and track engagement
- **Beginner-friendly UX:** No setup, no Reddit API key needed, works in 30 seconds

### User Journey

```
User lands on homepage
  → Signs up (email/Google via Supabase)
  → Pastes website URL
  → System scrapes website (5-10 seconds)
  → AI generates product profile
  → System searches Reddit (10-20 seconds)
  → 3-4 high-relevance threads shown (FREE tier)
  → User clicks "Generate Reply" on a thread
  → 3 reply variations shown with shadowban safety score
  → User copies reply or saves draft
  → User upgrades to PRO for unlimited searches
```

---

## 2. Tech Stack & Architecture

### Frontend

| Technology    | Version         | Purpose                              |
| ------------- | --------------- | ------------------------------------ |
| Next.js       | 15 (App Router) | Full-stack React framework           |
| TypeScript    | 5.x             | Type safety throughout               |
| Tailwind CSS  | 3.x             | Utility-first styling                |
| shadcn/ui     | latest          | Base UI component system             |
| Origin UI     | latest          | Extended beautiful component library |
| Framer Motion | latest          | Page transitions & micro-animations  |
| Lucide React  | latest          | Icon system                          |

### State & Data

| Technology        | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| Zustand           | Global client state (user session, UI state, analysis state) |
| TanStack Query v5 | Server state, caching, background refetching, mutations      |
| React Hook Form   | Form state management                                        |
| Zod               | Schema validation on client & server                         |

### Backend

| Technology         | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| Next.js API Routes | Backend endpoints                               |
| Supabase           | PostgreSQL database + Auth + Row Level Security |
| Supabase SSR       | Server-side auth helpers                        |
| Cheerio            | Fast HTML scraping                              |
| Axios              | HTTP requests to Reddit API & website scraping  |

### AI

| Technology            | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| Google Gemini 1.5 Pro | Product analysis, thread scoring, reply generation |
| @google/generative-ai | Official Gemini SDK                                |

### Payments

| Technology         | Purpose                                     |
| ------------------ | ------------------------------------------- |
| Dodo Payments      | Subscription management & one-time payments |
| @dodopayments/node | Official Dodo Payments Node SDK             |

### Infrastructure

| Technology    | Purpose                     |
| ------------- | --------------------------- |
| Vercel        | Deployment & Edge functions |
| Upstash Redis | Rate limiting & caching     |

---

## 3. Folder Structure

```
redditreach/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── route.ts                  ← Supabase OAuth callback
│   ├── (dashboard)/
│   │   ├── layout.tsx                    ← Dashboard shell with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx                  ← Main dashboard overview
│   │   ├── analyze/
│   │   │   └── page.tsx                  ← URL input & analysis trigger
│   │   ├── results/
│   │   │   └── [jobId]/
│   │   │       └── page.tsx              ← Reddit results for a job
│   │   ├── saved/
│   │   │   └── page.tsx                  ← Saved threads & drafts
│   │   ├── history/
│   │   │   └── page.tsx                  ← Past analyses
│   │   ├── settings/
│   │   │   └── page.tsx                  ← Profile & billing settings
│   │   └── upgrade/
│   │       └── page.tsx                  ← Upgrade to PRO page
│   ├── (marketing)/
│   │   ├── layout.tsx                    ← Marketing layout with nav/footer
│   │   ├── page.tsx                      ← Landing page (homepage)
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── blog/
│   │       ├── page.tsx                  ← Blog index
│   │       └── [slug]/
│   │           └── page.tsx              ← Blog post
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts                  ← POST: Scrape URL + generate product profile
│   │   ├── search-reddit/
│   │   │   └── route.ts                  ← POST: Search Reddit for threads
│   │   ├── score-threads/
│   │   │   └── route.ts                  ← POST: AI-score each thread
│   │   ├── generate-reply/
│   │   │   └── route.ts                  ← POST: Generate reply variations
│   │   ├── save-draft/
│   │   │   └── route.ts                  ← POST: Save a reply draft
│   │   ├── jobs/
│   │   │   ├── route.ts                  ← GET: List user's jobs
│   │   │   └── [jobId]/
│   │   │       └── route.ts              ← GET: Single job + results
│   │   ├── user/
│   │   │   ├── profile/
│   │   │   │   └── route.ts              ← GET/PATCH: User profile
│   │   │   └── credits/
│   │   │       └── route.ts              ← GET: Credit usage
│   │   ├── payments/
│   │   │   ├── create-checkout/
│   │   │   │   └── route.ts              ← POST: Create Dodo Payments checkout
│   │   │   ├── webhook/
│   │   │   │   └── route.ts              ← POST: Handle Dodo webhooks
│   │   │   └── portal/
│   │   │       └── route.ts              ← POST: Customer billing portal
│   │   └── health/
│   │       └── route.ts                  ← GET: Health check
│   ├── globals.css
│   └── layout.tsx                        ← Root layout
├── components/
│   ├── ui/                               ← shadcn/ui + Origin UI components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── analysis/
│   │   ├── UrlInputForm.tsx              ← Main URL input with validation
│   │   ├── AnalysisProgress.tsx          ← Live progress steps UI
│   │   └── ProductSummaryCard.tsx        ← Scraped product profile display
│   ├── reddit/
│   │   ├── ThreadCard.tsx                ← Single Reddit thread card
│   │   ├── ThreadList.tsx                ← Grid/list of thread cards
│   │   ├── RelevanceScore.tsx            ← Visual relevance score badge
│   │   ├── OpportunityBadge.tsx          ← Thread type badge
│   │   └── SubredditChip.tsx             ← Subreddit display chip
│   ├── reply/
│   │   ├── ReplyModal.tsx                ← Full reply generation modal
│   │   ├── ReplyVariantCard.tsx          ← Single reply variant with copy btn
│   │   ├── ToneSelector.tsx              ← Tone selection UI
│   │   ├── ShadowbanScore.tsx            ← Safety score display
│   │   └── DraftEditor.tsx               ← Editable reply draft
│   ├── dashboard/
│   │   ├── StatsBar.tsx                  ← Credits used, searches done
│   │   ├── RecentJobs.tsx                ← Recent analysis jobs list
│   │   └── UsageMeter.tsx                ← Visual usage bar
│   ├── billing/
│   │   ├── PricingTable.tsx              ← Pricing plans UI
│   │   ├── PlanBadge.tsx                 ← Current plan display
│   │   └── UpgradePrompt.tsx             ← Inline upgrade CTA
│   └── shared/
│       ├── LoadingSpinner.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       ├── CopyButton.tsx
│       └── ConfirmDialog.tsx
├── lib/
│   ├── gemini.ts                         ← All Gemini AI functions
│   ├── scraper.ts                        ← Website scraping logic
│   ├── reddit.ts                         ← Reddit API search functions
│   ├── supabase/
│   │   ├── client.ts                     ← Browser Supabase client
│   │   ├── server.ts                     ← Server Supabase client
│   │   └── middleware.ts                 ← Auth middleware helper
│   ├── dodo.ts                           ← Dodo Payments helpers
│   ├── rate-limit.ts                     ← Upstash rate limiting
│   ├── validations.ts                    ← Zod schemas
│   └── utils.ts                          ← General utilities
├── stores/
│   ├── useUserStore.ts                   ← User profile & plan state
│   ├── useAnalysisStore.ts               ← Current analysis job state
│   └── useUIStore.ts                     ← UI state (modals, sidebar, etc.)
├── hooks/
│   ├── useUser.ts                        ← Current user hook
│   ├── useAnalysis.ts                    ← Analysis job hook
│   ├── useRedditResults.ts               ← Results for a job
│   ├── useCredits.ts                     ← Credit/usage hook
│   └── useReplies.ts                     ← Reply generation hook
├── types/
│   └── index.ts                          ← All TypeScript interfaces
├── middleware.ts                          ← Next.js middleware (auth guard)
├── next.config.ts
├── tailwind.config.ts
└── .env.local
```

---

## 4. Environment Setup

### Step 4.1 — Create `.env.local` with these exact variable names

```env
# ─── Supabase ───────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ─── Google Gemini AI ────────────────────────────────────
GEMINI_API_KEY=

# ─── Dodo Payments ───────────────────────────────────────
DODO_PAYMENTS_API_KEY=
DODO_PAYMENTS_WEBHOOK_SECRET=
NEXT_PUBLIC_DODO_FREE_PLAN_ID=
NEXT_PUBLIC_DODO_PRO_PLAN_ID=
NEXT_PUBLIC_DODO_AGENCY_PLAN_ID=

# ─── Upstash Redis (Rate Limiting) ───────────────────────
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# ─── App Config ──────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RedditReach
```

---

## Phase 1 — Project Scaffolding

### Task 1.1 — Bootstrap Next.js App

Run this command exactly:

```bash
pnpx create-next-app@latest redditreach \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias="@/*"
cd redditreach
```

### Task 1.2 — Install All Dependencies

```bash
# ── shadcn/ui setup ──
pnpx shadcn@latest init
# When prompted: New York style, Zinc base color, CSS variables YES

# ── shadcn/ui components ──
pnpx shadcn@latest add button card input label badge dialog sheet tabs \
  progress toast skeleton separator avatar dropdown-menu popover \
  tooltip command select textarea switch alert form

# ── Origin UI ──
# Origin UI works as additional shadcn-compatible components
# Install via their CLI or copy components as needed:
pnpx shadcn@latest add "https://originui.com/r/comp-1.json"
# Note: Install these specific Origin UI components:
# - Animated number counter
# - Gradient cards
# - Feature grid
# - Pricing table

# ── Core packages ──
pnpm install @supabase/supabase-js @supabase/ssr
pnpm install @google/generative-ai
pnpm install @dodopayments/node
pnpm install @tanstack/react-query @tanstack/react-query-devtools
pnpm install zustand immer
pnpm install react-hook-form @hookform/resolvers zod
pnpm install axios cheerio
pnpm install @upstash/redis @upstash/ratelimit
pnpm install framer-motion
pnpm install lucide-react
pnpm install date-fns
pnpm install react-hot-toast
pnpm install next-themes
pnpm install clsx tailwind-merge
pnpm install @radix-ui/react-icons
```

### Task 1.3 — Configure `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // RedditReach brand colors
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          900: "#7c2d12",
        },
        reddit: {
          orange: "#FF4500",
          light: "#FF6534",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### Task 1.4 — Create `types/index.ts`

Create this file with ALL TypeScript interfaces for the entire project:

```typescript
// ─── User & Auth ────────────────────────────────────────────────────────────

export type Plan = "free" | "pro" | "agency";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  plan: Plan;
  credits_used: number;
  credits_limit: number;
  dodo_customer_id: string | null;
  dodo_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Product Analysis ────────────────────────────────────────────────────────

export interface ProductProfile {
  product_name: string;
  tagline: string;
  description: string;
  niche: string;
  target_audience: string[];
  pain_points_solved: string[];
  key_features: string[];
  keywords: string[];
  competitors: string[];
  reddit_search_queries: string[];
  best_subreddits: string[];
  product_category: string;
}

export type JobStatus =
  | "pending"
  | "scraping"
  | "analyzing"
  | "searching"
  | "scoring"
  | "done"
  | "error";

export interface AnalysisJob {
  id: string;
  user_id: string;
  url: string;
  product_profile: ProductProfile | null;
  status: JobStatus;
  error_message: string | null;
  results_count: number;
  created_at: string;
  updated_at: string;
}

// ─── Reddit ──────────────────────────────────────────────────────────────────

export type OpportunityType =
  | "question"
  | "complaint"
  | "recommendation_request"
  | "discussion"
  | "comparison"
  | "showcase";

export interface RedditThread {
  id: string;
  job_id: string;
  user_id: string;
  subreddit: string;
  post_title: string;
  post_url: string;
  post_body: string | null;
  author: string | null;
  upvotes: number;
  comment_count: number;
  relevance_score: number; // 0-100
  shadowban_risk: number; // 0-100 (lower = safer)
  opportunity_type: OpportunityType;
  scoring_reasoning: string;
  is_saved: boolean;
  has_replied: boolean;
  created_utc: number;
  created_at: string;
}

// ─── Replies ─────────────────────────────────────────────────────────────────

export type ReplyTone = "helpful" | "casual" | "expert" | "storyteller";

export interface ReplyVariant {
  tone: ReplyTone;
  text: string;
  shadowban_score: number; // 0-100 (higher = safer)
  word_count: number;
}

export interface SavedDraft {
  id: string;
  user_id: string;
  reddit_thread_id: string;
  thread_snapshot: Pick<RedditThread, "post_title" | "post_url" | "subreddit">;
  draft_text: string;
  tone: ReplyTone;
  shadowban_score: number;
  notes: string | null;
  is_posted: boolean;
  created_at: string;
  updated_at: string;
}

// ─── API Payloads ─────────────────────────────────────────────────────────────

export interface AnalyzeUrlPayload {
  url: string;
}

export interface GenerateReplyPayload {
  thread_id: string;
  product_profile: ProductProfile;
  thread: Pick<RedditThread, "post_title" | "post_body" | "subreddit">;
  selected_tone?: ReplyTone;
}

export interface SaveDraftPayload {
  reddit_thread_id: string;
  thread_snapshot: Pick<RedditThread, "post_title" | "post_url" | "subreddit">;
  draft_text: string;
  tone: ReplyTone;
  shadowban_score: number;
}

// ─── Billing ─────────────────────────────────────────────────────────────────

export interface PricingPlan {
  id: Plan;
  name: string;
  price_monthly: number;
  price_yearly: number;
  credits_per_month: number;
  features: string[];
  highlighted: boolean;
  dodo_plan_id: string;
}

// ─── UI State ────────────────────────────────────────────────────────────────

export interface AnalysisStep {
  id: string;
  label: string;
  status: "pending" | "loading" | "done" | "error";
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
}
```

### Task 1.5 — Create `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

export function getShadowbanLabel(score: number): {
  label: string;
  color: string;
} {
  if (score >= 85) return { label: "Very Safe", color: "text-green-600" };
  if (score >= 70) return { label: "Safe", color: "text-green-500" };
  if (score >= 50) return { label: "Moderate Risk", color: "text-yellow-600" };
  return { label: "High Risk", color: "text-red-500" };
}

export const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  pro: 100,
  agency: 500,
};
```

### ✅ Phase 1 Checkpoint

- [ ] `pnpx create-next-app` ran successfully
- [ ] All pnpm packages installed without errors
- [ ] `types/index.ts` created with all interfaces
- [ ] `lib/utils.ts` created
- [ ] `tailwind.config.ts` configured
- [ ] `.env.local` file created (values to be filled)

---

## Phase 2 — Supabase Database Schema

### Task 2.1 — Run SQL Migrations in Supabase SQL Editor

Go to your Supabase project → SQL Editor → Run each block one at a time:

**Block 1: Extensions**

```sql
create extension if not exists "uuid-ossp";
```

**Block 2: Profiles Table**

```sql
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'agency')),
  credits_used integer not null default 0,
  credits_limit integer not null default 3,
  dodo_customer_id text,
  dodo_subscription_id text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

**Block 3: Analysis Jobs Table**

```sql
create table public.analysis_jobs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  url text not null,
  product_profile jsonb,
  status text not null default 'pending'
    check (status in ('pending','scraping','analyzing','searching','scoring','done','error')),
  error_message text,
  results_count integer default 0,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

**Block 4: Reddit Results Table**

```sql
create table public.reddit_results (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references public.analysis_jobs(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  subreddit text not null,
  post_title text not null,
  post_url text not null,
  post_body text,
  author text,
  upvotes integer default 0,
  comment_count integer default 0,
  relevance_score integer default 0 check (relevance_score between 0 and 100),
  shadowban_risk integer default 0 check (shadowban_risk between 0 and 100),
  opportunity_type text default 'discussion'
    check (opportunity_type in ('question','complaint','recommendation_request','discussion','comparison','showcase')),
  scoring_reasoning text,
  is_saved boolean default false,
  has_replied boolean default false,
  created_utc bigint,
  created_at timestamp with time zone default now() not null
);
```

**Block 5: Saved Drafts Table**

```sql
create table public.saved_drafts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  reddit_thread_id uuid references public.reddit_results(id) on delete set null,
  thread_snapshot jsonb not null,
  draft_text text not null,
  tone text default 'helpful' check (tone in ('helpful','casual','expert','storyteller')),
  shadowban_score integer default 0 check (shadowban_score between 0 and 100),
  notes text,
  is_posted boolean default false,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

**Block 6: Indexes**

```sql
create index idx_analysis_jobs_user_id on public.analysis_jobs(user_id);
create index idx_analysis_jobs_created_at on public.analysis_jobs(created_at desc);
create index idx_reddit_results_job_id on public.reddit_results(job_id);
create index idx_reddit_results_user_id on public.reddit_results(user_id);
create index idx_reddit_results_relevance on public.reddit_results(relevance_score desc);
create index idx_saved_drafts_user_id on public.saved_drafts(user_id);
```

**Block 7: Row Level Security**

```sql
alter table public.profiles enable row level security;
alter table public.analysis_jobs enable row level security;
alter table public.reddit_results enable row level security;
alter table public.saved_drafts enable row level security;

-- Profiles
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Analysis Jobs
create policy "Users can manage own jobs"
  on public.analysis_jobs for all using (auth.uid() = user_id);

-- Reddit Results
create policy "Users can manage own results"
  on public.reddit_results for all using (auth.uid() = user_id);

-- Saved Drafts
create policy "Users can manage own drafts"
  on public.saved_drafts for all using (auth.uid() = user_id);
```

**Block 8: Auto-create Profile on Signup**

```sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

**Block 9: Auto-update `updated_at`**

```sql
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_jobs_updated_at
  before update on public.analysis_jobs
  for each row execute procedure public.set_updated_at();
```

### ✅ Phase 2 Checkpoint

- [ ] All 5 tables created in Supabase
- [ ] All indexes created
- [ ] RLS enabled on all tables
- [ ] All policies created
- [ ] Trigger `on_auth_user_created` working
- [ ] Test: Create a user via Supabase Auth UI → profile auto-created

---

## Phase 3 — Authentication System

### Task 3.1 — Supabase Client Files

**`lib/supabase/client.ts`** — Browser client:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

**`lib/supabase/server.ts`** — Server client:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {}
        },
      },
    },
  );
}
```

**`lib/supabase/admin.ts`** — Admin client for server-only operations:

```typescript
import { createClient } from "@supabase/supabase-js";

export const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);
```

### Task 3.2 — Middleware `middleware.ts`

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Protected dashboard routes
  const protectedPaths = [
    "/dashboard",
    "/analyze",
    "/results",
    "/saved",
    "/history",
    "/settings",
    "/upgrade",
  ];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from auth pages
  if (user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/health).*)"],
};
```

### Task 3.3 — OAuth Callback Route `app/(auth)/callback/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
```

### Task 3.4 — Login Page `app/(auth)/login/page.tsx`

Build a clean, minimal login page with:

- Email/password login form
- Google OAuth button (if configured in Supabase)
- Link to signup
- Error message display
- Loading states
- Redirect back to original page after login
- Use `react-hook-form` + `zod` for validation
- On submit: call `supabase.auth.signInWithPassword()`
- On success: router.push to `/dashboard` or redirect param

### Task 3.5 — Signup Page `app/(auth)/signup/page.tsx`

Build signup page with:

- Full name, email, password fields
- Password strength indicator
- Terms acceptance checkbox
- On submit: call `supabase.auth.signUp()`
- On success: show "Check your email" confirmation screen

### ✅ Phase 3 Checkpoint

- [ ] Supabase clients (browser, server, admin) created
- [ ] Middleware protecting dashboard routes
- [ ] Login page renders and works
- [ ] Signup page renders and works
- [ ] OAuth callback route working
- [ ] Test: Sign up → redirected to dashboard → profile exists in DB

---

## Phase 4 — Core Library Layer

### Task 4.1 — `lib/validations.ts`

```typescript
import { z } from "zod";

export const urlSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL (include https://)")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL must start with http:// or https://",
    ),
});

export const saveDraftSchema = z.object({
  reddit_thread_id: z.string().uuid(),
  draft_text: z.string().min(20, "Reply must be at least 20 characters"),
  tone: z.enum(["helpful", "casual", "expert", "storyteller"]),
  shadowban_score: z.number().min(0).max(100),
  notes: z.string().optional(),
  thread_snapshot: z.object({
    post_title: z.string(),
    post_url: z.string(),
    subreddit: z.string(),
  }),
});

export const generateReplySchema = z.object({
  thread_id: z.string(),
  product_profile: z.any(),
  thread: z.object({
    post_title: z.string(),
    post_body: z.string().nullable(),
    subreddit: z.string(),
  }),
  selected_tone: z
    .enum(["helpful", "casual", "expert", "storyteller"])
    .optional(),
});
```

### Task 4.2 — `lib/scraper.ts`

```typescript
import * as cheerio from "cheerio";
import axios from "axios";

export async function scrapeWebsite(url: string): Promise<{
  text: string;
  title: string;
  description: string;
}> {
  const response = await axios.get(url, {
    timeout: 20000,
    maxRedirects: 5,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
  });

  const $ = cheerio.load(response.data);

  // Extract meta
  const title = $("title").text().trim() || $("h1").first().text().trim();
  const description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";

  // Remove noise
  $(
    "script, style, nav, footer, header, aside, .cookie-banner, #cookie-notice, iframe, .advertisement, .ads, [data-ad]",
  ).remove();

  // Collect meaningful content
  const sections: string[] = [];
  const priority = [
    "main",
    "article",
    "[role='main']",
    ".hero",
    ".features",
    ".about",
    ".content",
    ".product",
  ];

  priority.forEach((selector) => {
    $(selector).each((_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (text.length > 50) sections.push(text);
    });
  });

  // Collect headings + paragraphs as fallback
  if (sections.length === 0) {
    $("h1, h2, h3, p, li").each((_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (text.length > 20) sections.push(text);
    });
  }

  const text = [...new Set(sections)].join("\n").slice(0, 12000);

  return { text, title, description };
}
```

### Task 4.3 — `lib/reddit.ts`

```typescript
import axios from "axios";

export interface RawRedditThread {
  id: string;
  title: string;
  url: string;
  subreddit: string;
  selftext: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  permalink: string;
}

const REDDIT_HEADERS = {
  "User-Agent":
    "RedditReach/1.0 (+https://redditreach.com; marketing research)",
};

async function searchRedditQuery(
  query: string,
  subreddit?: string,
): Promise<RawRedditThread[]> {
  const base = subreddit
    ? `https://www.reddit.com/r/${subreddit}/search.json`
    : "https://www.reddit.com/search.json";

  try {
    const { data } = await axios.get(base, {
      params: {
        q: query,
        sort: "relevance",
        t: "year",
        limit: 15,
        type: "link",
        ...(subreddit ? { restrict_sr: true } : {}),
      },
      headers: REDDIT_HEADERS,
      timeout: 12000,
    });

    return (data?.data?.children || [])
      .map((p: any) => p.data)
      .filter((p: any) => p.score > 3 && p.title.length > 10);
  } catch {
    return [];
  }
}

export async function bulkSearchReddit(
  queries: string[],
  subreddits: string[],
): Promise<RawRedditThread[]> {
  // Stagger requests to avoid rate limits
  const tasks: Promise<RawRedditThread[]>[] = [];

  // Top 4 queries globally
  queries.slice(0, 4).forEach((q) => tasks.push(searchRedditQuery(q)));

  // Top 3 subreddits × top 2 queries
  subreddits.slice(0, 3).forEach((sr) => {
    queries.slice(0, 2).forEach((q) => tasks.push(searchRedditQuery(q, sr)));
  });

  const results = await Promise.allSettled(tasks);
  const all: RawRedditThread[] = [];
  const seenIds = new Set<string>();

  results.forEach((r) => {
    if (r.status === "fulfilled") {
      r.value.forEach((t) => {
        if (!seenIds.has(t.id)) {
          seenIds.add(t.id);
          all.push(t);
        }
      });
    }
  });

  // Sort by engagement (score + comments)
  return all.sort(
    (a, b) => b.score + b.num_comments - (a.score + a.num_comments),
  );
}
```

### Task 4.4 — `lib/gemini.ts`

This is the AI brain of the app. Create it with these four core functions:

**Function 1: `analyzeProduct(websiteText, url, metaTitle, metaDescription)`**

- Input: raw scraped text + URL + meta
- Output: Full `ProductProfile` JSON
- Prompt must ask for: product_name, tagline, description, niche, target_audience (array), pain_points_solved (array), key_features (array), keywords (array), competitors (array), reddit_search_queries (5 specific queries people would type), best_subreddits (5-7 subreddits), product_category
- Return ONLY valid JSON, no markdown backticks

**Function 2: `scoreThread(thread, productProfile)`**

- Input: thread data + product profile
- Output: `{ relevance_score: number, shadowban_risk: number, opportunity_type: OpportunityType, scoring_reasoning: string, should_include: boolean }`
- Score 0-100 relevance. Threads under score 40 return should_include: false
- shadowban_risk: how risky it would be to comment with product mention (lower = safer)

**Function 3: `generateReplyVariants(thread, productProfile)`**

- Input: thread + product profile
- Generate 3 variants: helpful, casual, expert
- Each variant must: address the thread's actual question first (60%+ of reply), mention product naturally at end, be 80-200 words, no corporate language, no "check out" / "I recommend" phrases
- Each variant also gets a `shadowban_score` (0-100, higher = safer)
- Rules for high shadowban_score: no promotional language, no direct links in opener, answer the question genuinely

**Function 4: `generateSingleReply(thread, productProfile, tone)`**

- Same as above but generates just one reply for the specified tone
- Used for regeneration

Full implementation of `lib/gemini.ts`:

````typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ProductProfile, ReplyVariant, OpportunityType } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
});

function parseJSON<T>(text: string): T {
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();
  return JSON.parse(cleaned);
}

export async function analyzeProduct(
  websiteText: string,
  url: string,
  metaTitle: string,
  metaDescription: string,
): Promise<ProductProfile> {
  const prompt = `You are a product analyst specializing in Reddit marketing strategy.

Analyze this website and extract detailed product information for Reddit marketing.

URL: ${url}
Page Title: ${metaTitle}
Meta Description: ${metaDescription}
Website Content:
${websiteText.slice(0, 8000)}

Return ONLY a valid JSON object with this EXACT structure (no markdown, no backticks):
{
  "product_name": "exact product/company name",
  "tagline": "one-line value proposition",
  "description": "2-3 sentence description of what it does and who it's for",
  "niche": "specific market niche (e.g. 'B2B sales automation SaaS', 'developer productivity tool')",
  "product_category": "broad category (e.g. 'SaaS', 'E-commerce', 'Mobile App', 'Service')",
  "target_audience": ["specific persona 1", "specific persona 2", "specific persona 3"],
  "pain_points_solved": ["specific problem 1", "specific problem 2", "specific problem 3", "specific problem 4"],
  "key_features": ["feature 1", "feature 2", "feature 3"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"],
  "competitors": ["competitor name 1", "competitor name 2"],
  "reddit_search_queries": [
    "exact search phrase someone types on Reddit when they have this problem",
    "another realistic Reddit search phrase",
    "third realistic search phrase",
    "fourth realistic search phrase",
    "fifth realistic search phrase"
  ],
  "best_subreddits": ["subreddit1", "subreddit2", "subreddit3", "subreddit4", "subreddit5", "subreddit6"]
}

IMPORTANT: reddit_search_queries must be natural language queries people actually type, not keyword lists. best_subreddits must NOT include the r/ prefix.`;

  const result = await model.generateContent(prompt);
  return parseJSON<ProductProfile>(result.response.text());
}

export async function scoreThread(
  thread: { title: string; body: string | null; subreddit: string },
  profile: ProductProfile,
): Promise<{
  relevance_score: number;
  shadowban_risk: number;
  opportunity_type: OpportunityType;
  scoring_reasoning: string;
  should_include: boolean;
}> {
  const prompt = `You are a Reddit marketing expert. Score how valuable this Reddit thread is as a marketing opportunity.

PRODUCT: ${profile.product_name}
DESCRIPTION: ${profile.description}
TARGET AUDIENCE: ${profile.target_audience.join(", ")}
PAIN POINTS SOLVED: ${profile.pain_points_solved.join(", ")}

REDDIT THREAD:
Subreddit: r/${thread.subreddit}
Title: ${thread.title}
Content: ${(thread.body || "").slice(0, 400)}

Return ONLY valid JSON (no backticks):
{
  "relevance_score": <0-100, how relevant is this thread to the product's target audience and pain points>,
  "shadowban_risk": <0-100, how risky is it to mention a product here: 0=very risky, 100=very safe>,
  "opportunity_type": <"question"|"complaint"|"recommendation_request"|"discussion"|"comparison"|"showcase">,
  "scoring_reasoning": "<one clear sentence explaining the score>",
  "should_include": <true if relevance_score >= 45, false otherwise>
}`;

  const result = await model.generateContent(prompt);
  return parseJSON(result.response.text());
}

export async function generateReplyVariants(
  thread: {
    title: string;
    body: string | null;
    subreddit: string;
    url: string;
  },
  profile: ProductProfile,
): Promise<ReplyVariant[]> {
  const tonePrompts: Record<string, string> = {
    helpful: `You are a knowledgeable Redditor who genuinely uses ${profile.product_name}. 
    Write a helpful reply that FIRST solves the problem with real advice (60-70% of reply), 
    then naturally mentions ${profile.product_name} as a tool you've found useful. 
    Sound like a real person helping, not selling.`,

    casual: `You are a casual Reddit user who stumbled on this thread. 
    Write in relaxed Reddit slang/tone, maybe start with a relatable observation. 
    Mention ${profile.product_name} naturally like you're recommending something to a friend. 
    No corporate language whatsoever. Can include light humor if appropriate.`,

    expert: `You are an industry expert/consultant who has seen many solutions. 
    Write with authority and provide genuinely valuable insight first. 
    Reference ${profile.product_name} as one of the professional tools you've encountered. 
    Sound like someone whose opinion carries weight due to experience.`,
  };

  const variants = await Promise.all(
    Object.entries(tonePrompts).map(async ([tone, instruction]) => {
      const prompt = `${instruction}

Thread Context:
Subreddit: r/${thread.subreddit}
Thread Title: ${thread.title}
Thread Content: ${(thread.body || "").slice(0, 500)}

Product you're mentioning: ${profile.product_name} - ${profile.description}
Product URL: (use the user's website URL naturally)

STRICT RULES:
- 80 to 180 words total
- NO bullet points or numbered lists
- NO phrases: "check out", "I highly recommend", "you should try", "visit our website", "click here"
- Address the actual question/problem first (majority of reply)
- Mention the product ONCE, naturally, near the end
- Write in natural Reddit prose paragraphs
- Do NOT start with "I" as the first word

After the reply text, on a new line, write: SHADOWBAN_SCORE:<number 0-100>
Where 100 = completely safe, 0 = will definitely get flagged.

Reply:`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const scoreMatch = text.match(/SHADOWBAN_SCORE:(\d+)/);
      const shadowban_score = scoreMatch ? parseInt(scoreMatch[1]) : 70;
      const replyText = text.replace(/SHADOWBAN_SCORE:\d+/g, "").trim();

      return {
        tone: tone as ReplyVariant["tone"],
        text: replyText,
        shadowban_score,
        word_count: replyText.split(/\s+/).length,
      };
    }),
  );

  return variants;
}

export async function generateSingleReply(
  thread: { title: string; body: string | null; subreddit: string },
  profile: ProductProfile,
  tone: ReplyVariant["tone"],
): Promise<ReplyVariant> {
  const variants = await generateReplyVariants(thread, profile);
  return variants.find((v) => v.tone === tone) || variants[0];
}
````

### Task 4.5 — `lib/rate-limit.ts`

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 5 analyses per hour for free users
export const analyzeRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "ratelimit:analyze",
});

// 30 reply generations per hour
export const replyRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 h"),
  prefix: "ratelimit:reply",
});

export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string,
): Promise<{ allowed: boolean; remaining: number; reset: Date }> {
  const { success, remaining, reset } = await limiter.limit(identifier);
  return { allowed: success, remaining, reset: new Date(reset) };
}
```

### Task 4.6 — `lib/dodo.ts`

```typescript
// Dodo Payments integration
// Docs: https://docs.dodopayments.com

export const DODO_API_BASE = "https://api.dodopayments.com/v1";

export interface DodoCheckoutSession {
  id: string;
  url: string;
  status: string;
}

export async function createCheckoutSession(params: {
  plan_id: string;
  user_id: string;
  email: string;
  success_url: string;
  cancel_url: string;
}): Promise<DodoCheckoutSession> {
  const response = await fetch(`${DODO_API_BASE}/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment_link: params.plan_id,
      customer: { email: params.email },
      metadata: { user_id: params.user_id },
      redirect_url: params.success_url,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Dodo Payments error: ${error}`);
  }

  return response.json();
}

export async function getSubscription(subscription_id: string) {
  const response = await fetch(
    `${DODO_API_BASE}/subscriptions/${subscription_id}`,
    {
      headers: { Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}` },
    },
  );
  return response.json();
}

export async function cancelSubscription(subscription_id: string) {
  const response = await fetch(
    `${DODO_API_BASE}/subscriptions/${subscription_id}/cancel`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}` },
    },
  );
  return response.json();
}

export function verifyWebhookSignature(
  payload: string,
  signature: string,
): boolean {
  // Implement Dodo's webhook verification
  // Check Dodo Payments docs for the exact HMAC verification method
  const crypto = require("crypto");
  const expectedSig = crypto
    .createHmac("sha256", process.env.DODO_PAYMENTS_WEBHOOK_SECRET!)
    .update(payload)
    .digest("hex");
  return expectedSig === signature;
}
```

### ✅ Phase 4 Checkpoint

- [ ] `lib/validations.ts` created with all Zod schemas
- [ ] `lib/scraper.ts` — scrapeWebsite works on a test URL
- [ ] `lib/reddit.ts` — bulkSearchReddit returns results for "productivity tool"
- [ ] `lib/gemini.ts` — analyzeProduct returns valid JSON for a test site
- [ ] `lib/rate-limit.ts` — imports without error
- [ ] `lib/dodo.ts` — created with correct API structure

---

## Phase 5 — API Routes (Backend)

### Task 5.1 — `app/api/analyze/route.ts`

This is the most critical API. It must:

1. Validate the URL with Zod
2. Authenticate the user via Supabase server client
3. Check rate limits (Upstash)
4. Check user's credit limit (free: 3 analyses/month)
5. Create an `analysis_job` record with status `'scraping'`
6. Call `scrapeWebsite(url)`
7. Update job status to `'analyzing'`
8. Call `analyzeProduct()` with Gemini
9. Update job with `product_profile` and status `'searching'`
10. Call `bulkSearchReddit()` with the product's queries + subreddits
11. Update job status to `'scoring'`
12. Call `scoreThread()` for each thread in parallel (max 20 threads)
13. Filter to threads where `should_include: true`
14. Insert top results into `reddit_results` table (capped at 3 for free, unlimited for pro)
15. Update job status to `'done'` with `results_count`
16. Increment `credits_used` on user profile
17. Return `{ job_id, product_profile, results_count }`

Handle errors at each step by updating job status to `'error'` with `error_message`.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { adminSupabase } from "@/lib/supabase/admin";
import { urlSchema } from "@/lib/validations";
import { scrapeWebsite } from "@/lib/scraper";
import { analyzeProduct, scoreThread } from "@/lib/gemini";
import { bulkSearchReddit } from "@/lib/reddit";
import { analyzeRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // 1. Auth
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Validate input
    const body = await req.json();
    const parsed = urlSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 },
      );
    }
    const { url } = parsed.data;

    // 3. Rate limit
    const { allowed } = await analyzeRateLimit.limit(user.id);
    if (!allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait before analyzing again." },
        { status: 429 },
      );
    }

    // 4. Check credits
    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("credits_used, credits_limit, plan")
      .eq("id", user.id)
      .single();

    if (profile && profile.credits_used >= profile.credits_limit) {
      return NextResponse.json(
        {
          error:
            "You've used all your free analyses. Upgrade to Pro for unlimited searches.",
          upgrade_required: true,
        },
        { status: 403 },
      );
    }

    // 5. Create job
    const { data: job } = await adminSupabase
      .from("analysis_jobs")
      .insert({ user_id: user.id, url, status: "scraping" })
      .select()
      .single();

    if (!job) {
      return NextResponse.json(
        { error: "Failed to create analysis job" },
        { status: 500 },
      );
    }

    try {
      // 6. Scrape website
      const { text, title, description } = await scrapeWebsite(url);

      // 7. Analyze with Gemini
      await adminSupabase
        .from("analysis_jobs")
        .update({ status: "analyzing" })
        .eq("id", job.id);

      const productProfile = await analyzeProduct(
        text,
        url,
        title,
        description,
      );

      // 8. Search Reddit
      await adminSupabase
        .from("analysis_jobs")
        .update({ status: "searching", product_profile: productProfile })
        .eq("id", job.id);

      const rawThreads = await bulkSearchReddit(
        productProfile.reddit_search_queries,
        productProfile.best_subreddits,
      );

      // 9. Score threads
      await adminSupabase
        .from("analysis_jobs")
        .update({ status: "scoring" })
        .eq("id", job.id);

      const scoredThreads = await Promise.allSettled(
        rawThreads
          .slice(0, 20)
          .map((t) =>
            scoreThread(
              { title: t.title, body: t.selftext, subreddit: t.subreddit },
              productProfile,
            ).then((score) => ({ ...t, ...score })),
          ),
      );

      const validThreads = scoredThreads
        .filter((r) => r.status === "fulfilled" && r.value.should_include)
        .map((r) => (r as PromiseFulfilledResult<any>).value)
        .sort((a, b) => b.relevance_score - a.relevance_score);

      // 10. Cap results based on plan
      const isPro = profile?.plan === "pro" || profile?.plan === "agency";
      const resultsToSave = isPro ? validThreads : validThreads.slice(0, 3);

      // 11. Save results
      if (resultsToSave.length > 0) {
        await adminSupabase.from("reddit_results").insert(
          resultsToSave.map((t) => ({
            job_id: job.id,
            user_id: user.id,
            subreddit: t.subreddit,
            post_title: t.title,
            post_url: `https://reddit.com${t.permalink}`,
            post_body: t.selftext || null,
            author: t.author,
            upvotes: t.score,
            comment_count: t.num_comments,
            relevance_score: t.relevance_score,
            shadowban_risk: t.shadowban_risk,
            opportunity_type: t.opportunity_type,
            scoring_reasoning: t.scoring_reasoning,
            created_utc: t.created_utc,
          })),
        );
      }

      // 12. Mark done
      await adminSupabase
        .from("analysis_jobs")
        .update({ status: "done", results_count: resultsToSave.length })
        .eq("id", job.id);

      // 13. Increment credits
      await adminSupabase
        .from("profiles")
        .update({ credits_used: (profile?.credits_used || 0) + 1 })
        .eq("id", user.id);

      return NextResponse.json({
        job_id: job.id,
        product_profile: productProfile,
        results_count: resultsToSave.length,
      });
    } catch (innerError) {
      await adminSupabase
        .from("analysis_jobs")
        .update({
          status: "error",
          error_message: (innerError as Error).message,
        })
        .eq("id", job.id);
      throw innerError;
    }
  } catch (error) {
    console.error("Analyze error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}
```

### Task 5.2 — `app/api/generate-reply/route.ts`

```typescript
// POST: Generate reply variants for a Reddit thread
// Input: { thread_id, product_profile, thread: { post_title, post_body, subreddit } }
// 1. Auth check
// 2. Rate limit check (replyRateLimit)
// 3. Call generateReplyVariants(thread, productProfile)
// 4. Return { variants: ReplyVariant[] }
```

### Task 5.3 — `app/api/save-draft/route.ts`

```typescript
// POST: Save a reply draft
// Input: SaveDraftPayload
// 1. Auth check
// 2. Validate with saveDraftSchema
// 3. Insert into saved_drafts
// 4. Update reddit_result.is_saved = true
// 5. Return { draft_id }
```

### Task 5.4 — `app/api/jobs/route.ts`

```typescript
// GET: Return paginated list of user's analysis jobs
// Query params: page, limit
// Include results_count in each job
// Sort by created_at DESC
```

### Task 5.5 — `app/api/jobs/[jobId]/route.ts`

```typescript
// GET: Return single job + all reddit_results for that job
// Auth: ensure job.user_id === current user
// Return: { job, results: RedditThread[] }
```

### Task 5.6 — `app/api/payments/create-checkout/route.ts`

```typescript
// POST: Create Dodo Payments checkout
// Input: { plan: 'pro' | 'agency' }
// 1. Auth check
// 2. Get plan_id from env based on plan
// 3. Call createCheckoutSession() from lib/dodo.ts
// 4. Return { checkout_url }
```

### Task 5.7 — `app/api/payments/webhook/route.ts`

```typescript
// POST: Handle Dodo Payments webhooks
// 1. Verify signature using verifyWebhookSignature()
// 2. Handle these events:
//    - payment.succeeded → update profile plan, set subscription_id
//    - subscription.cancelled → revert profile to 'free' plan
//    - subscription.renewed → extend subscription
// 3. Return 200 OK

// Plan credit limits:
// free → credits_limit: 3
// pro → credits_limit: 100
// agency → credits_limit: 500
```

### Task 5.8 — `app/api/user/profile/route.ts`

```typescript
// GET: Return current user's profile
// PATCH: Update full_name or avatar_url
```

### ✅ Phase 5 Checkpoint

- [ ] `POST /api/analyze` works end-to-end (test with a real URL)
- [ ] `POST /api/generate-reply` returns 3 reply variants
- [ ] `POST /api/save-draft` saves to DB
- [ ] `GET /api/jobs` returns user's jobs
- [ ] `GET /api/jobs/[jobId]` returns job + results
- [ ] `POST /api/payments/create-checkout` returns checkout URL
- [ ] `POST /api/payments/webhook` updates user plan correctly
- [ ] All routes return proper HTTP status codes

---

## Phase 6 — State Management (Zustand)

### Task 6.1 — `stores/useUserStore.ts`

```typescript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { UserProfile } from "@/types";

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  updateCredits: (used: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  immer((set) => ({
    profile: null,
    isLoading: true,

    setProfile: (profile) =>
      set((state) => {
        state.profile = profile;
      }),

    setLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),

    updateCredits: (used) =>
      set((state) => {
        if (state.profile) state.profile.credits_used = used;
      }),

    reset: () =>
      set((state) => {
        state.profile = null;
        state.isLoading = false;
      }),
  })),
);
```

### Task 6.2 — `stores/useAnalysisStore.ts`

```typescript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
  AnalysisJob,
  ProductProfile,
  AnalysisStep,
  JobStatus,
} from "@/types";

interface AnalysisState {
  currentUrl: string;
  currentJobId: string | null;
  currentStatus: JobStatus | null;
  productProfile: ProductProfile | null;
  steps: AnalysisStep[];
  isAnalyzing: boolean;
  error: string | null;

  setUrl: (url: string) => void;
  startAnalysis: (jobId: string) => void;
  updateStatus: (status: JobStatus) => void;
  setProductProfile: (profile: ProductProfile) => void;
  setError: (error: string) => void;
  reset: () => void;
}

const defaultSteps: AnalysisStep[] = [
  { id: "scraping", label: "Reading your website", status: "pending" },
  {
    id: "analyzing",
    label: "Understanding your product with AI",
    status: "pending",
  },
  {
    id: "searching",
    label: "Searching Reddit conversations",
    status: "pending",
  },
  { id: "scoring", label: "Scoring opportunities", status: "pending" },
  { id: "done", label: "Results ready!", status: "pending" },
];

export const useAnalysisStore = create<AnalysisState>()(
  immer((set) => ({
    currentUrl: "",
    currentJobId: null,
    currentStatus: null,
    productProfile: null,
    steps: defaultSteps,
    isAnalyzing: false,
    error: null,

    setUrl: (url) =>
      set((s) => {
        s.currentUrl = url;
      }),

    startAnalysis: (jobId) =>
      set((s) => {
        s.currentJobId = jobId;
        s.isAnalyzing = true;
        s.error = null;
        s.steps = defaultSteps.map((step) => ({ ...step, status: "pending" }));
      }),

    updateStatus: (status) =>
      set((s) => {
        s.currentStatus = status;
        const statusToStepMap: Record<string, string> = {
          scraping: "scraping",
          analyzing: "analyzing",
          searching: "searching",
          scoring: "scoring",
          done: "done",
          error: "done",
        };
        const activeStepId = statusToStepMap[status];
        s.steps = s.steps.map((step) => {
          if (step.id === activeStepId)
            return {
              ...step,
              status: status === "error" ? "error" : "loading",
            };
          const stepIndex = s.steps.findIndex((st) => st.id === step.id);
          const activeIndex = s.steps.findIndex((st) => st.id === activeStepId);
          if (stepIndex < activeIndex) return { ...step, status: "done" };
          return step;
        });
        if (status === "done") {
          s.isAnalyzing = false;
          s.steps = s.steps.map((step) => ({ ...step, status: "done" }));
        }
      }),

    setProductProfile: (profile) =>
      set((s) => {
        s.productProfile = profile;
      }),

    setError: (error) =>
      set((s) => {
        s.error = error;
        s.isAnalyzing = false;
      }),

    reset: () =>
      set((s) => {
        s.currentUrl = "";
        s.currentJobId = null;
        s.currentStatus = null;
        s.productProfile = null;
        s.steps = defaultSteps;
        s.isAnalyzing = false;
        s.error = null;
      }),
  })),
);
```

### Task 6.3 — `stores/useUIStore.ts`

```typescript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UIState {
  sidebarOpen: boolean;
  activeReplyModal: string | null; // thread id
  activeThreadId: string | null;

  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  openReplyModal: (threadId: string) => void;
  closeReplyModal: () => void;
  setActiveThread: (threadId: string | null) => void;
}

export const useUIStore = create<UIState>()(
  immer((set) => ({
    sidebarOpen: true,
    activeReplyModal: null,
    activeThreadId: null,

    setSidebarOpen: (open) =>
      set((s) => {
        s.sidebarOpen = open;
      }),
    toggleSidebar: () =>
      set((s) => {
        s.sidebarOpen = !s.sidebarOpen;
      }),
    openReplyModal: (id) =>
      set((s) => {
        s.activeReplyModal = id;
      }),
    closeReplyModal: () =>
      set((s) => {
        s.activeReplyModal = null;
      }),
    setActiveThread: (id) =>
      set((s) => {
        s.activeThreadId = id;
      }),
  })),
);
```

---

## Phase 7 — Data Fetching Layer (TanStack Query)

### Task 7.1 — Setup QueryClient Provider `app/layout.tsx`

Wrap the entire app with `QueryClientProvider` and `ReactQueryDevtools`.

```typescript
// app/layout.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Task 7.2 — `hooks/useUser.ts`

```typescript
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/useUserStore";

export function useUser() {
  const { profile, setProfile, setLoading } = useUserStore();

  const query = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const res = await fetch("/api/user/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data.profile);
      return data.profile;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    user: profile,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
```

### Task 7.3 — `hooks/useAnalysis.ts`

```typescript
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAnalysisStore } from "@/stores/useAnalysisStore";
import toast from "react-hot-toast";

export function useAnalysis() {
  const router = useRouter();
  const { startAnalysis, setProductProfile, setError, updateStatus } =
    useAnalysisStore();

  const mutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      return data;
    },
    onMutate: () => {
      // Analysis started — store updates happen in component
    },
    onSuccess: (data) => {
      setProductProfile(data.product_profile);
      updateStatus("done");
      toast.success(`Found ${data.results_count} Reddit opportunities!`);
      router.push(`/results/${data.job_id}`);
    },
    onError: (error: Error) => {
      setError(error.message);
      toast.error(error.message);
    },
  });

  return {
    analyze: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
```

### Task 7.4 — `hooks/useRedditResults.ts`

```typescript
import { useQuery } from "@tanstack/react-query";
import type { RedditThread, AnalysisJob } from "@/types";

export function useRedditResults(jobId: string) {
  return useQuery<{ job: AnalysisJob; results: RedditThread[] }>({
    queryKey: ["reddit-results", jobId],
    queryFn: async () => {
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) throw new Error("Failed to load results");
      return res.json();
    },
    enabled: !!jobId,
    staleTime: 2 * 60 * 1000,
  });
}
```

### Task 7.5 — `hooks/useReplies.ts`

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReplyVariant, GenerateReplyPayload } from "@/types";
import toast from "react-hot-toast";

export function useReplies() {
  const queryClient = useQueryClient();

  const generateMutation = useMutation<
    ReplyVariant[],
    Error,
    GenerateReplyPayload
  >({
    mutationFn: async (payload) => {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate reply");
      return data.variants;
    },
    onError: (error) => toast.error(error.message),
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save draft");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Draft saved!");
      queryClient.invalidateQueries({ queryKey: ["saved-drafts"] });
    },
  });

  return {
    generateReplies: generateMutation.mutateAsync,
    isGenerating: generateMutation.isPending,
    saveDraft: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
  };
}
```

---

## Phase 8 — UI Component Library

### Task 8.1 — Design System Tokens

Define these CSS variables in `app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    --primary: 20 96% 48%; /* Orange - brand color */
    --primary-foreground: 0 0% 100%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 20 96% 48%;
    --radius: 0.625rem;
  }

  .dark {
    --background: 224 71.4% 4.1%;
    --foreground: 210 20% 98%;
    --card: 224 71.4% 4.1%;
    --card-foreground: 210 20% 98%;
    --primary: 20 96% 55%;
    --primary-foreground: 0 0% 100%;
    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 210 20% 98%;
    --muted: 215 27.9% 16.9%;
    --muted-foreground: 217.9 10.6% 64.9%;
    --accent: 215 27.9% 16.9%;
    --accent-foreground: 210 20% 98%;
    --border: 215 27.9% 16.9%;
    --input: 215 27.9% 16.9%;
    --ring: 20 96% 55%;
  }
}
```

### Task 8.2 — `components/analysis/UrlInputForm.tsx`

Build this component with:

- Large URL input field with clear placeholder ("https://yourproduct.com")
- Real-time URL validation using Zod
- "Analyze" button with loading spinner
- Character showing the domain extracted from URL
- Error message display below input
- Disabled state while analyzing
- On submit: call `useAnalysis().analyze(url)`

### Task 8.3 — `components/analysis/AnalysisProgress.tsx`

Build animated progress stepper:

- 5 steps: Scraping → Analyzing → Searching Reddit → Scoring → Done
- Each step has: icon, label, status indicator
- Pending: gray circle
- Loading: spinning orange circle
- Done: green checkmark (animated)
- Error: red X
- Use Framer Motion for step transitions
- Show estimated time remaining (rough guess: "~15 seconds")

### Task 8.4 — `components/reddit/ThreadCard.tsx`

The core card component for displaying Reddit opportunities:

```
┌─────────────────────────────────────────────────────┐
│ r/entrepreneur            [Recommendation] [Score: 87]│
│                                                       │
│ "Best tools for cold outreach in 2024?"              │
│ Started 3 days ago · 142 upvotes · 47 comments       │
│                                                       │
│ "We've been struggling with finding warm leads..."    │
│                                                       │
│ 🟢 Great opportunity — matches pain point: finding   │
│    potential customers                                 │
│                                                       │
│         [View Thread ↗]  [Generate Reply →]          │
└─────────────────────────────────────────────────────┘
```

Features:

- Subreddit name with link
- Opportunity type badge (color-coded)
- Relevance score badge (color: green 80+, yellow 60+, orange 40+)
- Post title (truncated to 2 lines)
- Post metadata: age, upvotes, comment count
- Post body preview (first 150 chars)
- AI reasoning text (from `scoring_reasoning`)
- "View Thread" button (opens Reddit in new tab)
- "Generate Reply" button (opens ReplyModal)
- Save to favorites button (top right corner)

### Task 8.5 — `components/reply/ReplyModal.tsx`

Full-screen modal for reply generation:

- Header: Thread title + subreddit
- Tone selector: 4 buttons (Helpful / Casual / Expert / Storyteller)
- Loading state: skeleton while generating
- 3 reply variant cards side by side (or stacked on mobile)
- Each card shows: tone label, word count, shadowban score, reply text
- Shadowban score visual: colored badge + short label
- Copy button on each card (copies text, shows "Copied!" feedback)
- Save draft button on each card
- Regenerate button to get fresh variations
- Close button

### Task 8.6 — `components/reply/ShadowbanScore.tsx`

Visual component for shadowban safety:

- Score 0-100
- Color gradient: red (0) → orange (50) → green (85+)
- Label: "High Risk" / "Moderate" / "Safe" / "Very Safe"
- Small shield icon
- Tooltip explaining what the score means

### Task 8.7 — `components/dashboard/UsageMeter.tsx`

Credit usage visualization:

- Progress bar showing `credits_used / credits_limit`
- Text: "3 of 3 free analyses used"
- Color changes: green → yellow → red as credits deplete
- CTA: "Upgrade for unlimited" appears when 80%+ used

### Task 8.8 — `components/billing/PricingTable.tsx`

Three-column pricing table:

```
FREE          PRO ($19/mo)      AGENCY ($49/mo)
3 analyses    100 analyses/mo   500 analyses/mo
3 results     Unlimited results Unlimited results
Basic replies Priority AI       Priority AI
              Saved drafts      Team features
              CSV export        API access
              Email support     Dedicated support

[Current Plan] [Upgrade Now ✨]  [Contact Sales]
```

- Highlight PRO as "Most Popular"
- Monthly/yearly toggle (yearly = 2 months free)
- Feature comparison rows
- CTA buttons connect to `create-checkout` API

---

## Phase 9 — Landing Page

### Task 9.1 — `app/(marketing)/page.tsx`

Build a compelling landing page with these sections in order:

**Section 1: Hero**

- Headline: "Find Reddit conversations ready for your product"
- Sub: "Paste your URL. We find the threads. AI writes the replies. You grow organically."
- Two CTAs: "Try Free — No card needed" and "See how it works ↓"
- Animated mockup showing the tool working (static illustration or screenshot)

**Section 2: How It Works (3 steps)**

- Step 1: "Paste your URL" — We analyze your product automatically
- Step 2: "We search Reddit" — Find conversations where your product fits naturally
- Step 3: "AI drafts your reply" — Human-sounding replies that won't get you banned

**Section 3: Feature Highlights**

- 6 feature cards with icons:
  1. 🎯 Relevance Scoring — Every thread rated 0-100
  2. 🛡️ Shadowban Protection — AI avoids spammy language
  3. 🎭 Multi-tone Replies — Helpful, casual, or expert voice
  4. 🔍 Deep Reddit Search — Searches across 100s of subreddits
  5. 💾 Save & Manage Drafts — Never lose a good reply
  6. 📊 Track Your Replies — See which posts you've engaged with

**Section 4: Social Proof / Stats**

- "500+ products analyzed"
- "10,000+ Reddit opportunities found"
- "Trusted by indie hackers & SaaS founders"

**Section 5: Pricing Preview**

- Simplified pricing with "Get Started Free" CTA

**Section 6: FAQ**

- Will I get shadowbanned?
- Does this work for any type of product?
- Do I need a Reddit account?
- How many searches do I get free?

**Section 7: Final CTA**

- "Start finding your Reddit opportunities" + Signup button

### Task 9.2 — `app/(marketing)/pricing/page.tsx`

Full pricing page using the `PricingTable` component with more detail.

---

## Phase 10 — Dashboard Pages

### Task 10.1 — Dashboard Layout `app/(dashboard)/layout.tsx`

```
┌──────────┬────────────────────────────────────────┐
│          │  TopBar: Logo | Search | User Avatar    │
│ Sidebar  ├────────────────────────────────────────┤
│          │                                         │
│ Dashboard│           Page Content                  │
│ Analyze  │                                         │
│ History  │                                         │
│ Saved    │                                         │
│ Settings │                                         │
│          │                                         │
│ ──────── │                                         │
│ Plan Info│                                         │
│ Upgrade  │                                         │
└──────────┴────────────────────────────────────────┘
```

- Collapsible sidebar on desktop
- Mobile: slide-in drawer via Sheet component
- Current page highlighted in sidebar
- User avatar + name in sidebar bottom
- Plan badge in sidebar bottom

### Task 10.2 — Main Dashboard `app/(dashboard)/dashboard/page.tsx`

Show:

- Welcome message: "Welcome back, [name]"
- UsageMeter component
- "Start New Analysis" button (big, prominent)
- Recent analyses (last 5 jobs with status badges)
- Stats: Total analyses, Total opportunities found, Saved drafts count

### Task 10.3 — Analyze Page `app/(dashboard)/analyze/page.tsx`

The main action page:

- UrlInputForm prominently centered
- When analyzing: AnalysisProgress component replaces the form
- ProductSummaryCard appears after analysis completes
- Auto-navigates to `/results/[jobId]` when done

### Task 10.4 — Results Page `app/(dashboard)/results/[jobId]/page.tsx`

- Use `useRedditResults(jobId)` hook
- ProductSummaryCard at top
- Filter bar: sort by relevance, filter by opportunity type
- ThreadList with all ThreadCards
- "Load more results" for Pro users
- Free tier: show blurred lock overlay on 4th+ results with upgrade prompt
- Empty state if no results

### Task 10.5 — Saved Page `app/(dashboard)/saved/page.tsx`

- List of saved drafts using `useQuery`
- Group by: All / Not Posted / Posted
- Each draft shows: thread title, subreddit, tone badge, shadowban score, draft text preview
- Actions: Edit, Copy, Mark as Posted, Delete

### Task 10.6 — History Page `app/(dashboard)/history/page.tsx`

- Paginated list of all past analysis jobs
- Columns: URL, Status, Results Found, Date
- Click row → navigate to results page
- Delete job option

### Task 10.7 — Settings Page `app/(dashboard)/settings/page.tsx`

Tabs:

- **Profile:** Edit name, avatar
- **Billing:** Current plan, usage, cancel subscription, upgrade/downgrade
- **Notifications:** Email preferences (future feature placeholder)
- **Danger Zone:** Delete account

---

## Phase 11 — Core Feature Pages

### Task 11.1 — Implement Free Tier Gate

In `results/[jobId]/page.tsx`, after showing 3 results:

```tsx
{
  results.length > 3 && !isPro && (
    <div className="relative">
      {/* Blurred card previews */}
      <div className="blur-sm pointer-events-none">
        {results.slice(3).map((t) => (
          <ThreadCard key={t.id} thread={t} />
        ))}
      </div>
      {/* Upgrade overlay */}
      <UpgradePrompt count={results.length - 3} />
    </div>
  );
}
```

`UpgradePrompt` component should show:

- "🔒 X more opportunities hidden"
- "Upgrade to Pro to unlock all results"
- Upgrade button

### Task 11.2 — Implement Reply Modal Flow

When user clicks "Generate Reply" on a ThreadCard:

1. `useUIStore.openReplyModal(thread.id)`
2. ReplyModal opens
3. On mount, automatically calls `useReplies().generateReplies()`
4. Shows loading skeletons while AI generates
5. When done, shows 3 variants
6. User can select tone, copy, or save

### Task 11.3 — Copy to Clipboard with Feedback

Create `components/shared/CopyButton.tsx`:

```tsx
// Button that copies text on click and shows "Copied!" for 2 seconds
// Use navigator.clipboard.writeText()
// Show check icon when copied
```

---

## Phase 12 — Payments (Dodo Payments)

### Task 12.1 — Create Payment Plans in Dodo Dashboard

Set up these products in your Dodo Payments dashboard:

- **RedditReach Pro** — $19/month recurring
- **RedditReach Agency** — $49/month recurring
- Copy the plan IDs into `.env.local`

### Task 12.2 — Upgrade Page `app/(dashboard)/upgrade/page.tsx`

- Show `PricingTable` component
- On plan select: call `POST /api/payments/create-checkout`
- Redirect user to Dodo Payments hosted checkout URL
- After payment: Dodo redirects to `/dashboard?upgraded=true`
- Show success toast if `?upgraded=true` in URL

### Task 12.3 — Webhook Handler (ensure this is robust)

In `app/api/payments/webhook/route.ts`:

- Verify Dodo webhook signature
- On `payment.succeeded`:
  ```sql
  UPDATE profiles SET
    plan = 'pro',
    credits_limit = 100,
    dodo_subscription_id = '...',
    dodo_customer_id = '...'
  WHERE id = user_id_from_metadata
  ```
- On `subscription.cancelled`:
  ```sql
  UPDATE profiles SET plan = 'free', credits_limit = 3 WHERE ...
  ```
- Return `{ received: true }` with status 200

---

## Phase 13 — Freemium Logic & Credit System

### Credit System Rules

| Plan   | Monthly Analyses | Results Shown  | Reply Drafts     |
| ------ | ---------------- | -------------- | ---------------- |
| Free   | 3                | 3 per analysis | 3 total          |
| Pro    | 100              | All results    | Unlimited        |
| Agency | 500              | All results    | Unlimited + team |

### Credit Reset Logic

Credits reset monthly. Add this to the Supabase Edge Function or a cron:

```sql
-- Run on 1st of each month
UPDATE profiles SET credits_used = 0;
```

Or track `credits_reset_at` and reset on first use after reset date.

### Task 13.1 — Credit Enforcement

In `app/api/analyze/route.ts` (already covered in Phase 5), the credit check must:

1. Query current `credits_used` and `credits_limit`
2. If `credits_used >= credits_limit` → return 403 with `upgrade_required: true`
3. After successful analysis → increment `credits_used`

### Task 13.2 — Frontend Credit Display

`components/dashboard/UsageMeter.tsx`:

- Show progress bar: e.g., "2 / 3 analyses used this month"
- Color: green (< 50%), yellow (50-80%), red (> 80%)
- When at limit: show "Upgrade" button inline
- Tooltip: "Resets on [date]"

---

## Phase 14 — Advanced Features

### Task 14.1 — Keyword/Subreddit Override

In the Analyze page, after URL input, allow advanced users to:

- Add custom subreddits to search (beyond AI suggestions)
- Add custom keywords
- Filter by time range (past week / month / year)
  Store these preferences per job.

### Task 14.2 — Reply History Tracking

After user marks a draft as "posted":

- `saved_drafts.is_posted = true`
- `reddit_results.has_replied = true`
- Dashboard shows: "You've replied to X threads this month"

### Task 14.3 — Export to CSV (Pro Feature)

In results page, "Export CSV" button for Pro users:

- Columns: Thread Title, Subreddit, URL, Relevance Score, Opportunity Type, Saved Draft
- Use browser `Blob` + `URL.createObjectURL` to trigger download

```typescript
function exportToCSV(results: RedditThread[]) {
  const headers = ["Title", "Subreddit", "URL", "Score", "Type"];
  const rows = results.map((r) => [
    r.post_title,
    r.subreddit,
    r.post_url,
    r.relevance_score,
    r.opportunity_type,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reddit-opportunities.csv";
  a.click();
}
```

### Task 14.4 — Dark Mode Support

- Wrap app in `ThemeProvider` from `next-themes`
- Add theme toggle to Navbar and Settings
- Ensure all components use semantic CSS variables (already done in design tokens)

### Task 14.5 — Email Notifications (Future/Placeholder)

Add to Settings page:

- Toggle: "Email me new Reddit opportunities weekly"
- (Implementation: Supabase Edge Functions + Resend)
- For now: save preference to profile, show "coming soon"

### Task 14.6 — Subreddit Culture Briefings

When showing results, for each unique subreddit, show a small info card:

- Subreddit size (from Reddit API)
- Posting rules summary (AI-generated from subreddit sidebar)
- Self-promotion policy (strict / moderate / lenient)
- Best time to post
  Cache these per subreddit for 24 hours in Redis.

---

## Phase 15 — Polish, SEO & Performance

### Task 15.1 — Metadata for All Pages

In each `page.tsx`, add:

```typescript
export const metadata: Metadata = {
  title: "Page Title | RedditReach",
  description: "...",
  openGraph: { title: "...", description: "...", type: "website" },
};
```

Root layout metadata:

```typescript
export const metadata: Metadata = {
  title: { default: "RedditReach", template: "%s | RedditReach" },
  description:
    "Find Reddit conversations where your product belongs. AI-powered Reddit marketing tool.",
  keywords: [
    "reddit marketing",
    "reddit growth",
    "product marketing",
    "AI marketing tool",
  ],
};
```

### Task 15.2 — Error Handling & Boundaries

Create `components/shared/ErrorBoundary.tsx`:

- Catch render errors and show friendly error page
- Include "Try again" button

Global error page `app/error.tsx`:

- Clean error UI
- "Go to Dashboard" button
- Log error to console

### Task 15.3 — Loading States

Every page that fetches data must have:

- Skeleton loaders (not just spinners)
- `loading.tsx` file in each route directory
- Graceful empty states with descriptive copy

Create `app/(dashboard)/results/[jobId]/loading.tsx`:

```tsx
// Show 3 ThreadCard skeletons + ProductSummaryCard skeleton
```

### Task 15.4 — API Error Responses

All API routes must return consistent error format:

```typescript
interface ApiError {
  error: string;
  code?: string;
  upgrade_required?: boolean;
}
```

### Task 15.5 — Performance Optimizations

- Add `revalidate = 60` to dashboard pages (ISR)
- Memoize heavy components with `React.memo`
- Use `useCallback` for handlers in list components
- Lazy load ReplyModal with `React.lazy + Suspense`
- Image optimization: use `next/image` everywhere

### Task 15.6 — `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.redditstatic.com" },
      { protocol: "https", hostname: "*.redd.it" },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["cheerio"],
  },
};

export default nextConfig;
```

---

## Phase 16 — Testing & QA Checklist

### Task 16.1 — Manual Test Checklist

Run through every item before considering the build complete:

**Auth Flow**

- [ ] New user can sign up with email
- [ ] Verify email flow works
- [ ] User can log in
- [ ] User can log out
- [ ] Middleware blocks /dashboard when logged out
- [ ] Profile is auto-created on signup

**Analysis Flow**

- [ ] URL validation rejects invalid URLs
- [ ] Valid URL triggers analysis
- [ ] Progress steps animate correctly
- [ ] Product profile displays correctly
- [ ] Reddit results appear
- [ ] 3 results shown for free users
- [ ] All results shown for pro users

**Reply Flow**

- [ ] "Generate Reply" opens modal
- [ ] Loading state shows while generating
- [ ] 3 reply variants appear
- [ ] Copy button copies text
- [ ] "Copied!" feedback shows
- [ ] Save draft saves to DB
- [ ] Saved draft appears in /saved

**Credits System**

- [ ] Free user credits decrement on analysis
- [ ] 403 error when credits exhausted
- [ ] Upgrade prompt appears at credit limit
- [ ] Pro user has higher limit

**Payments**

- [ ] Checkout redirects to Dodo Payments
- [ ] After payment, plan updates to 'pro'
- [ ] Webhook updates profile correctly
- [ ] Cancelled subscription reverts to free

**UI/UX**

- [ ] All pages responsive on mobile (375px)
- [ ] Dark mode toggles correctly
- [ ] All error states show friendly messages
- [ ] Loading skeletons appear while fetching
- [ ] Empty states have helpful copy

### Task 16.2 — Environment Variables Check

Before deploying, verify ALL env vars are set in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`
- `DODO_PAYMENTS_API_KEY`
- `DODO_PAYMENTS_WEBHOOK_SECRET`
- `NEXT_PUBLIC_DODO_PRO_PLAN_ID`
- `NEXT_PUBLIC_DODO_AGENCY_PLAN_ID`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_APP_URL` (set to production domain)

### Task 16.3 — Deploy to Vercel

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel --prod

# Set env vars via Vercel dashboard or CLI:
vercel env add GEMINI_API_KEY production
```

Configure in Vercel dashboard:

- Add Dodo Payments webhook URL: `https://yourdomain.com/api/payments/webhook`
- Set Supabase Site URL to your Vercel domain
- Add Vercel domain to Supabase Auth redirect URLs

---

## Feature Spec Sheet

### Features Included in MVP

| Feature              | Free    | Pro       | Agency    |
| -------------------- | ------- | --------- | --------- |
| URL Analysis         | 3/month | 100/month | 500/month |
| Reddit Results Shown | 3       | Unlimited | Unlimited |
| AI Reply Generation  | 3 total | Unlimited | Unlimited |
| Reply Tone Variants  | 3       | 3         | 3         |
| Shadowban Score      | ✅      | ✅        | ✅        |
| Save Drafts          | ✅      | ✅        | ✅        |
| Analysis History     | ✅      | ✅        | ✅        |
| CSV Export           | ❌      | ✅        | ✅        |
| Dark Mode            | ✅      | ✅        | ✅        |
| Priority AI          | ❌      | ✅        | ✅        |

### Innovative Features (Differentiation)

1. **Shadowban Safety Score** — Every AI reply is graded on how likely it is to get removed or flagged. Shows users exactly how "safe" their comment is before they post it.

2. **Opportunity Type Tagging** — Each thread is tagged as: `question`, `complaint`, `recommendation_request`, `comparison`, or `discussion`. Users can filter to only see the types that convert best.

3. **Subreddit Culture Cards** — Before replying, users see a brief "culture guide" for each subreddit (posting rules, self-promo tolerance, community vibe). This prevents culturally inappropriate comments.

4. **Reply Variation by Tone** — Not just one AI reply, but 3 different personality styles. Users pick the voice that matches how they want to be perceived.

5. **Pain Point Matching** — AI doesn't just keyword-match; it understands the product's specific pain points and looks for threads where people express exactly those frustrations.

6. **Product Profile Page** — After scraping, users see a "your product as Reddit sees it" profile: which subreddits you belong to, what keywords describe you, who your audience is. Valuable market intelligence on its own.

---

## UI/UX Design System

### Color Palette

```
Primary (Brand Orange):  #F97316  — Buttons, links, highlights
Danger/Reddit:           #FF4500  — Reddit-related elements
Success Green:           #22C55E  — Scores, confirmations
Warning Yellow:          #EAB308  — Moderate risk, caution
Background:              #FFFFFF (light) / #0A0A0F (dark)
Card:                    #FAFAFA (light) / #111118 (dark)
Border:                  #E5E7EB (light) / #1F2937 (dark)
Text Primary:            #111827 (light) / #F9FAFB (dark)
Text Muted:              #6B7280 (light) / #9CA3AF (dark)
```

### Typography

```
Headings:   "Geist" or "Cal Sans" — strong, modern, startup-y
Body:       "Geist Mono" or system-ui — clean, readable
Code/Tags:  "JetBrains Mono" — for subreddit names, scores
```

### Spacing Scale (Tailwind)

- Component padding: `p-4` (16px)
- Card padding: `p-6` (24px)
- Section gaps: `gap-6` or `gap-8`
- Page max-width: `max-w-7xl`

### Icon Style

- Use Lucide React throughout
- Key icons: `Search`, `Zap`, `Shield`, `MessageSquare`, `BookmarkPlus`, `BarChart2`, `ArrowRight`, `Copy`, `Check`, `AlertTriangle`, `Lock`

### Animation Guidelines

- Page entrance: `fade-in` 0.3s ease-out
- Modal: scale from 0.95 + fade, 0.2s
- Cards: stagger entrance with 50ms delays
- Progress steps: smooth status transitions 0.3s
- Button hover: slight scale(1.02), 0.15s
- Use Framer Motion for complex animations

### Card Design Rules

- Border radius: `rounded-xl` (12px)
- Border: `1px solid border`
- Shadow: `shadow-sm` default, `shadow-md` on hover
- Hover state: slight border color change + shadow increase
- Transition: `transition-all duration-200`

---

## Final Notes for Gemini CLI

1. **Read the entire document before writing any code.** The phases are interdependent.

2. **Complete phases in order.** Don't start Phase 5 (API Routes) before Phase 4 (Core Libraries) is done.

3. **Test incrementally.** After each phase, run `pnpm run dev` and verify nothing is broken before proceeding.

4. **Keep TypeScript strict.** Run `pnpx tsc --noEmit` after each phase and fix all type errors before moving on.

5. **Handle loading and error states for every async operation.** Never leave a component without a loading state.

6. **Never hardcode API keys.** Always use `process.env.*` variables.

7. **Gemini API quota awareness.** The analyze endpoint makes multiple Gemini calls (1 for product analysis + up to 20 for thread scoring + 3 for reply variants). Consider batching or caching aggressively.

8. **Reddit API is rate-limited.** Add 300-500ms delays between Reddit requests in `bulkSearchReddit`. Reddit blocks IPs that request too fast.

9. **The `adminSupabase` client (service role key) must ONLY be used in server-side code** (API routes). Never import it in client components.

10. **Dodo Payments integration:** Refer to official Dodo Payments documentation at https://docs.dodopayments.com for the most up-to-date webhook event names and API payload structures.

---

_End of RedditReach Build Guide — Total Phases: 16 | Total Tasks: 60+_
