'use client';

import { useState } from 'react';
import { useShortenLink } from '../../hooks/useShortenLink';

export default function EncurtarPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [password, setPassword] = useState('');
  const { shorten, shortUrl, error, loading } = useShortenLink();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await shorten(originalUrl, customSlug || undefined, password || undefined);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-gray-900 p-6 rounded shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Encurtar URL</h1>

        <div>
          <label htmlFor="url" className="block text-sm mb-1">URL original *</label>
          <input
            id="url"
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="https://exemplo.com"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm mb-1">Slug personalizado (opcional)</label>
          <input
            id="slug"
            type="text"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="meu-link"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">Senha (opcional)</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            placeholder="Proteja o link com senha"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 transition rounded text-white"
        >
          {loading ? 'Encurtando...' : 'Encurtar'}
        </button>

        {shortUrl && (
          <div className="text-center mt-4">
            <p className="text-green-400">Link criado com sucesso:</p>
            <a
              href={shortUrl}
              className="underline text-blue-400 break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </form>
    </main>
  );
}
