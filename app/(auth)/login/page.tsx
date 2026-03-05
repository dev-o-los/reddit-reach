import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | RedditReach",
  description: "Sign in to your RedditReach account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
