import { useState } from 'react';
import axios from 'axios';

export function useShortenLink() {
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function shorten(originalUrl: string, slug?: string, password?: string) {
    setError('');
    setLoading(true);
    setShortUrl('');

    try {
      const res = await axios.post('/api/shorten', {
        originalUrl,
        slug,
        password,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('Slug já está em uso');
      } else {
        setError('Erro ao encurtar link');
      }
    } finally {
      setLoading(false);
    }
  }

  return { shorten, shortUrl, error, loading };
}
