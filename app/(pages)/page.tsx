'use client';

import Head from "next/head";
import TopNavBar from "@/components/topNavBar";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home - My App</title>
      </Head>
      <TopNavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 pt-20">
        <main className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Welcome to My App</h1>
          <p className="text-gray-700 mb-4 text-center">
            This is a simple and minimalistic homepage to introduce the website. Explore the features and services we offer.
          </p>
          <div className="flex space-x-4 mb-8">
            <Button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Sign In
            </Button>
            <Button className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition">
              Sign Up
            </Button>
          </div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">Student Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Access your courses, track your progress, and manage your account all in one place.
              </p>
              <div className="flex space-x-4">
                <Button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  View Courses
                </Button>
                <Button className="w-full py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition">
                  Manage Account
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-600">
              <p>
                Need help? Visit our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Support Center
                </a>
                .
              </p>
            </CardFooter>
          </Card>
        </main>
      </div>
    </>
  );
}