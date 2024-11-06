'use client';

import Head from "next/head";
import TopNavBar from "@/components/topNavBar";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home - My App</title>
      </Head>
      <TopNavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <main className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
          <p className="text-gray-700 mb-4 text-center">
            This is a simple and minimalistic homepage to introduce the website. Explore the features and services we offer.
          </p>
        </main>
      </div>
    </>
  );
}