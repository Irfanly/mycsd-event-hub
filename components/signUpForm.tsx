'use client';

import { useState } from "react";
import fireauth from "@/services/fireauth";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fireauth.signUp(email, password);
      // Optionally, you can update the user's profile with the name
      await fireauth.updateDisplayName(name);
      // Redirect to the student page or show a success message
    } catch (error) {
      console.error("Sign up error:", error);
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
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Sign Up
          </button>
          <div className="text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 hover:underline">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}