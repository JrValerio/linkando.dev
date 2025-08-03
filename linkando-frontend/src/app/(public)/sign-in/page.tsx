'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa6';
import logo from '@/assets/logo.png';
import background from '@/assets/background.png';

type Provider = 'google' | 'github';

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fakeLogin = async (provider: Provider) => {
    setIsLoading(provider);
    setError(null);

    try {
      // Simula autenticação (substituir por signIn() real)
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Coluna do conteúdo */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="self-start">
            <Image
              src={logo}
              alt="Logo Linkando"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="text-center space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Encurte seus links com segurança.
            </h2>
            <p className="text-gray-600">
              Use sua conta Google ou GitHub para entrar com segurança.
            </p>

            {error && (
              <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded-md border border-red-300 max-w-sm mx-auto">
                {error}
              </div>
            )}

            <div className="flex gap-3 max-w-sm mx-auto">
              {/* Botão GitHub */}
              <button
                onClick={() => fakeLogin('github')}
                disabled={!!isLoading}
                className={`flex items-center justify-center gap-2 border border-gray-300 rounded-md px-5 py-2 w-1/2 transition ${
                  isLoading === 'github'
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {isLoading === 'github' ? (
                  <span className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                ) : (
                  <FaGithub className="w-4 h-4 text-gray-800" />
                )}
                <span className="text-sm font-medium text-gray-700">GitHub</span>
              </button>

              {/* Botão Google */}
              <button
                onClick={() => fakeLogin('google')}
                disabled={!!isLoading}
                className={`flex items-center justify-center gap-2 text-white rounded-md px-5 py-2 w-1/2 transition ${
                  isLoading === 'google'
                    ? 'bg-violet-400'
                    : 'bg-violet-500 hover:bg-violet-600'
                }`}
              >
                {isLoading === 'google' ? (
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <FaGoogle className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>

            <div className="flex items-center text-gray-500 text-xs font-medium my-2 max-w-sm mx-auto">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-3">OU</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="text-xs text-gray-600">
              Não tem uma conta?{' '}
              <a href="/signup" className="text-blue-600 font-semibold hover:underline">
                Cadastre-se
              </a>
            </div>
          </div>
        </div>

        {/* Coluna da imagem */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src={background}
            alt="Background Illustration"
            width={877}
            height={920}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
