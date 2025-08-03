import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Fontes customizadas
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

// Metadados globais
export const metadata: Metadata = {
  title: 'Linkando.dev',
  description: 'Este é o site oficial do encurtador de URLs Linkando.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
