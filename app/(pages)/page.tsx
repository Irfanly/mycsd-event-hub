'use client';

import Image from "next/image";
import { useState } from "react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
      <main className="flex flex-col gap-4 items-center">
        <Image
          className="invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex flex-col items-center bg-white p-16 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-8">{isSignUp ? "Sign Up" : "Login"}</h1>
          <form className="flex flex-col gap-6 w-full">
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold">Name</label>
                <input type="text" id="name" name="name" required className="p-4 border border-gray-300 rounded" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold">Email</label>
              <input type="email" id="email" name="email" required className="p-4 border border-gray-300 rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold">Password</label>
              <input type="password" id="password" name="password" required className="p-4 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="p-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          <button
            className="mt-6 text-blue-500 underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </main>
    </div>
  );
}