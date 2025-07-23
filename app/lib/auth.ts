/* eslint-disable @typescript-eslint/no-explicit-any */


import { getServerSession } from "next-auth";
import type { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth"; // Importar NextAuthOptions aqui
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";


declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "musician" | "contractor" | "admin" | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: "musician" | "contratante" | "admin" | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "musician" | "contratante" | "admin" | null;
    picture?: string | null;
  }
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email e Senha",
      credentials: { email: { label: "Email", type: "text" }, password: { label: "Senha", type: "password" }, },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) { throw new Error("E-mail e senha são obrigatórios."); }
        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
        try {
          const res = await fetch(`${backendUrl}/auth/login`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: credentials.email, password: credentials.password, }),
          });
          if (!res.ok) { const errorData = await res.json(); throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || errorData.error || "Credenciais inválidas."); }
          const user = await res.json();
          if (user && user.id) { return { id: user.id, email: user.email, name: user.fullName, image: user.picture, role: user.accountType, }; } else { return null; }
        } catch (e: any) { console.error("Erro de rede/backend no NextAuth CredentialProvider:", e); throw new Error(e.message || "Erro ao conectar com o servidor de autenticação."); }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: { params: { prompt: "consent", access_type: "offline", response_type: "code", }, },
      async profile(profile) {
        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
        try {
          const res = await fetch(`${backendUrl}/auth/social-login-callback`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: profile.email, fullName: profile.name, socialId: profile.sub, provider: 'google', picture: profile.picture, }),
          });
          if (!res.ok) { const errorData = await res.json(); throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || errorData.error || "Erro ao processar login Google."); }
          const backendUser = await res.json();
          return { id: backendUser.id, name: backendUser.fullName, email: backendUser.email, image: backendUser.picture || profile.picture, role: backendUser.accountType, };
        } catch (e: any) { console.error("Erro ao chamar backend para usuário Google:", e); throw new Error(e.message || "Erro ao conectar com o backend para login Google."); }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string, clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      async profile(profile) {
        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
        try {
          const res = await fetch(`${backendUrl}/auth/social-login-callback`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: profile.email, fullName: profile.name, socialId: profile.id, provider: 'facebook', picture: profile.picture?.data?.url, }),
          });
          if (!res.ok) { const errorData = await res.json(); throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || errorData.error || "Erro ao processar login Facebook."); }
          const backendUser = await res.json();
          return { id: backendUser.id, name: backendUser.fullName, email: backendUser.email, image: backendUser.picture || profile.picture?.data?.url, role: backendUser.accountType, };
        } catch (e: any) { console.error("Erro ao chamar backend para usuário Facebook:", e); throw new Error(e.message || "Erro ao conectar com o backend para login Facebook."); }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) { token.id = user.id; token.email = user.email; token.name = user.name; token.role = (user as any).role; token.picture = user.image; }
      if (profile) { token.picture = (profile as any).picture || (profile as any).image || token.picture; }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.picture as string;
      const roleMapping: Record<string, "musician" | "contractor" | "admin" | null> = { musico: "musician", contratante: "contractor", admin: "admin", };
      session.user.role = roleMapping[token.role as string] || null;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) { return url; } else if (url.startsWith("/")) { return new URL(url, baseUrl).toString(); }
      return baseUrl;
    },
  },
  pages: { signIn: "/login", },

  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60, },
  debug: process.env.NODE_ENV === "development",
};

export { signIn, signOut } from "next-auth/react";


export async function auth() {
  return await getServerSession(authOptions);
}