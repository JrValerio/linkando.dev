'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function VerifyPasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = searchParams.get('slug');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`/api/verify-password/${slug}`, { password });

      if (res.status === 200) {
        const { destination } = res.data;
        router.push(destination);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Senha incorreta');
      } else {
        setError('Erro ao verificar a senha');
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded w-full max-w-sm shadow space-y-4">
        <h1 className="text-xl font-semibold text-center">Protegido por senha 🔐</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a senha"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded"
        >
          Acessar
        </button>
      </form>
    </main>
  );
}
