'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);

    // 🔐 Aqui entraria a chamada real para API de cadastro
    // await axios.post('/api/register', { name, email, password });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Criar conta</h1>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
        >
          Cadastrar
        </button>

        {success && (
          <p className="text-green-600 text-center text-sm mt-2">
            Cadastro simulado com sucesso!
          </p>
        )}

        <p className="text-center text-sm text-gray-500">
          Já tem conta?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}
