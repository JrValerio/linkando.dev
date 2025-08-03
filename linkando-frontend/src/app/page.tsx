'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Linkando.dev - Login';
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-sm w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Bem-vindo ao Linkando.dev</h1>
        <p className="text-sm text-gray-400">Encurte e gerencie seus links com segurança.</p>

        <div className="space-y-4">
          <button
            className="w-full py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition"
            onClick={() => signIn('google')}
          >
            Entrar com Google
          </button>

          <button
            className="w-full py-2 px-4 bg-black border border-white text-white rounded hover:bg-white hover:text-black transition"
            onClick={() => signIn('github')}
          >
            Entrar com GitHub
          </button>
        </div>
      </div>
    </main>
  );
}
