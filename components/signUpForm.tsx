'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import fireauth from "@/services/fireauth";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fireauth.signIn(email, password);
      // Redirect to the student page or show a success message
      if (await fireauth.isUserLoggedIn()) {
        window.location.href = "/student";
      } else {
        console.log("User not signed in");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-6 text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="font-medium">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="font-medium">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          <p>
            Not your computer? Use Guest mode to sign in privately.{" "}
            <a href="#" className="text-blue-600 hover:underline">Learn more</a>
          </p>
          <div className="text-center mt-4">
            <a href="/signup" className="text-blue-600 hover:underline">Create account</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}