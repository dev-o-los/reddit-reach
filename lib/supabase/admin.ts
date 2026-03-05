import { createClient } from "@supabase/supabase-js";

/**
 * Administrative Supabase client for server-side operations that bypass Row Level Security.
 * ONLY for use in API routes and server components that require privileged access.
 */
export const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
