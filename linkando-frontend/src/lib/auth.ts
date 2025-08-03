import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",              // Tela de login
    signOut: "/",             // Após logout
    error: "/?error=true",    // Caso ocorra erro
    newUser: "/dashboard",    // Primeira vez logado
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;  // Sempre vai pra dashboard após login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
