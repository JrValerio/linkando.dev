import { useEffect, useState } from 'react';
import { ShortLink } from '../types';
import axios from 'axios';

export function useDashboardLinks() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await axios.get('/api/links');
        setLinks(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Erro ao carregar links');
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  return { links, loading, error };
}
