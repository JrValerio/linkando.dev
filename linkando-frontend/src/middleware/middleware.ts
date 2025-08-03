import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.pathname;
    console.log(`[ACESSO] ${url} - ${new Date().toISOString()}`);

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) return false;

        // Se for rota de admin, exige role 'admin'
        if (typeof token === 'object' && token.role && token.role === 'admin') {
          return true;
        }

        if (token && token.email) {
          return true;
        }

        return false;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/encurtar/:path*',
  ],
};
