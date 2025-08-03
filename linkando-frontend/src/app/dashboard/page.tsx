'use client';

import LogoutButton from '../../components/LogoutButton';
import { useDashboardLinks } from '../../hooks/useDashboardLinks';

export default function DashboardPage() {
  const { links, loading, error } = useDashboardLinks();

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Meus Links</h1>
        <LogoutButton />
      </div>

      {loading && <p className="text-gray-400">Carregando...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && links.length === 0 && !error && (
        <p className="text-gray-400">Você ainda não criou nenhum link.</p>
      )}

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.slug} className="bg-gray-800 p-4 rounded shadow">
            <p className="font-medium">{link.slug}</p>
            <p className="text-sm text-gray-400 break-all">{link.originalUrl}</p>
            <p className="text-sm text-green-400">Cliques: {link.clicks}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
