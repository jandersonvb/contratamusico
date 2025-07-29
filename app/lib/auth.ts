import { getServerSession, type NextAuthOptions } from "next-auth";
/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email e Senha",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL!;
        const res = await fetch(`${backendUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        if (!res.ok) throw new Error("Credenciais inválidas");
        const user = await res.json();
        return user && user.id ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL!;
        const res = await fetch(`${backendUrl}/auth/social-login-callback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile.email,
            fullName: profile.name,
            socialId: profile.sub,
            provider: "google",
            picture: profile.picture,
          }),
        });
        const user = await res.json();
        console.log("USer from Google:", user);
        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          image: user.picture,
          role: user.accountType,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      async profile(profile) {
        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL!;
        const res = await fetch(`${backendUrl}/auth/social-login-callback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile.email,
            fullName: profile.name,
            socialId: profile.id,
            provider: "facebook",
            picture: profile.picture?.data?.url,
          }),
        });
        const user = await res.json();
        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          image: user.picture,
          role: user.accountType,
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.image = token.picture as string;
      session.user.role = token.role as "musician" | "admin" | "contractor" | null | undefined;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

export async function auth() {
  return getServerSession(authOptions);
}
