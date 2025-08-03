'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export function useVerifyPasswordPage() {
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

  return { password, error, setPassword, handleSubmit };
}
