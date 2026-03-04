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
