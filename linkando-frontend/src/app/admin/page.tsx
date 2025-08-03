'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('/api/admin/users'); // Requer token/jwt
        setUsers(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Erro ao buscar usuários');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Painel Administrativo</h1>

      {loading && <p className="text-gray-400">Carregando usuários...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {users.length > 0 && (
        <table className="w-full border border-gray-700 rounded overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left px-4 py-2">Nome</th>
              <th className="text-left px-4 py-2">E-mail</th>
              <th className="text-left px-4 py-2">Criado em</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900">
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-700">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && users.length === 0 && !error && (
        <p className="text-gray-400">Nenhum usuário encontrado.</p>
      )}
    </main>
  );
}
