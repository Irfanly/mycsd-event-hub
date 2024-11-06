//template for student page

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import fireauth from "@/services/fireauth";
import { useRouter } from "next/router";

export default function StudentPage() {

  return (
    <>
      <Head>
        <title>Student - My App</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        This is homepage
      </div>
    </>
  );
}