import axios from 'axios';
import { redirect } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default async function SlugRedirectPage({ params }: Props) {
  const { slug } = params;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slug/${slug}`);
    const { destination, requiresPassword } = res.data;

    if (requiresPassword) {
      redirect(`/verify-password?slug=${slug}`);
    } else {
      redirect(destination);
    }
  } catch (err: any) {
    console.error('Erro ao buscar o slug:', err?.response?.data || err.message);
    redirect('/404');
  }

  return null;
}
