'use client';

import { useState } from "react";
import fireauth from "@/services/fireauth";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    //Sign in user
    try {
      await fireauth.signIn(email, password);
      // Redirect to the student page or show a success message
    } catch (error) {
      console.error("Sign in error:", error);
    }
    //Check if user is signed in
    if(await fireauth.isUserLoggedIn()) {
      //Redirect to student page
      window.location.href = "/student";
    }else {
      console.log("User not signed in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
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
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
          <div className="text-center text-sm text-gray-600">
            <p>
              Not your computer? Use Guest mode to sign in privately.{" "}
              <a href="#" className="text-blue-600 hover:underline">Learn more</a>
            </p>
          </div>
          <div className="text-center">
            <a href="/signup" className="text-blue-600 hover:underline">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}