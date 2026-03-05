import { SignupForm } from "@/components/auth/SignupForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | RedditReach",
  description: "Create your RedditReach account.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Join RedditReach to start growing your presence on Reddit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
