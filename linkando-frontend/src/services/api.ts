import axios from 'axios';
import type { ShortLink } from '../types';

export async function getDashboardData(): Promise<ShortLink[]> {
  const response = await axios.get('/api/links');
  return response.data;
}
