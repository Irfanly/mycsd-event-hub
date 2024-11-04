'use client';

import { useState } from "react";
import { auth } from "@/conf/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        // Optionally, you can update the user's profile with the name
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <>
      <Head>
        <title>{isSignUp ? "Sign Up" : "Login"} - My App</title>
      </Head>
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
            <form className="flex flex-col gap-6 w-full" onSubmit={handleAuth}>
              {isSignUp && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-bold">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="p-4 border border-gray-300 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="p-4 border border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-bold">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="p-4 border border-gray-300 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
    </>
  );
}