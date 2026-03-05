import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Route handler for the OAuth callback.
 * It exchanges the code for a session and redirects the user to the dashboard.
 */
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

  // If there's an error or no code, redirect to login with an error message
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
