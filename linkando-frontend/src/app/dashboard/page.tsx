'use client';

import { useEffect, useState } from 'react';
import { getDashboardData } from '../../services/api';
import type { ShortLink } from '../../types';

export default function DashboardPage() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const data = await getDashboardData();
        setLinks(data);
      } catch (error) {
        console.error('Erro ao carregar links:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Meus Links</h1>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : links.length === 0 ? (
        <p className="text-gray-400">Você ainda não criou nenhum link.</p>
      ) : (
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.slug} className="bg-gray-800 p-4 rounded shadow">
              <p className="font-medium">{link.slug}</p>
              <p className="text-sm text-gray-400 break-all">{link.originalUrl}</p>
              <p className="text-sm text-green-400">Cliques: {link.clicks}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
