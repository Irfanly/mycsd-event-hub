'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";
import Link from "next/link";
import fireauth from "@/services/fireauth";
import firestore from "@/services/firestore";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //Role tak siap lagi. Tak include role assignment dalam page ni.
  const [role, setRole] = useState("student");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await fireauth.signUp(email, password);
      await fireauth.updateDisplayName(name);
      const docRef = await firestore.addUserToDatabase();
      if(role === "student") {
        await firestore.addStudentToDatabase(docRef.id);
      } else if(role === "studentOrganization") {
        await firestore.addStudentOrganizationToDatabase(docRef.id);
      } 


      if (await fireauth.isUserLoggedIn()) {
        window.location.href = "/student";
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during sign up. Please try again.");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-[480px] m-4">
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-2 mb-6">
          <div className="h-12 w-12 bg-black rounded flex items-center justify-center">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold">myCSD Event Hub</h1>
        </div>
        
        {/* Sign Up Card */}
        <Card className="w-full bg-white shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-semibold">Create an account</h2>
              <p className="text-sm text-gray-500">Sign up to get started</p>
            </div>
            
            <form className="space-y-4" onSubmit={handleSignUp}>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-black/90"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>

              <div className="space-y-4 pt-2">
                <div className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link href="/signin" className="text-black hover:underline">
                    Sign in
                  </Link>
                </div>
                
                <p className="text-xs text-center text-gray-500">
                  By continuing, you agree to our{' '}
                  <Link href="/terms" className="text-gray-700 hover:text-black">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-gray-700 hover:text-black">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}