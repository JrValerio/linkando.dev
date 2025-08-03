'use client';

import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800 px-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold">Cadastro via Google ou GitHub</h1>
        <p className="text-sm text-gray-600">
          Para se registrar no <strong>Linkando.dev</strong>, utilize sua conta do Google ou GitHub na tela de login.
        </p>
        <Link
          href="/sign-in"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Voltar para o login
        </Link>
      </div>
    </main>
  );
}
