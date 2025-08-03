"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import SocialButton from "../components/SocialButton";


export default function Home() {
  useEffect(() => {
    document.title = "Linkando.dev - Login";
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-sm w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Bem-vindo ao Linkando.dev</h1>
        <p className="text-sm text-gray-400">
          Encurte e gerencie seus links com segurança.
        </p>

        <div className="space-y-4">
          <SocialButton provider="google" onClick={() => signIn("google")} />
          <SocialButton provider="github" onClick={() => signIn("github")} />
        </div>
      </div>
    </main>
  );
}
