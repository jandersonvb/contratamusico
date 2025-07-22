// contratamusico-frontend/app/providers/NextAuthProvider.tsx
"use client"; // ESSENCIAL: Marca este componente como um Client Component

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Importe o tipo Session do NextAuth.js

export default function NextAuthProvider({
  children,
  session, // Esta prop 'session' vem do Server Component (RootLayout)
}: {
  children: React.ReactNode;
  session: Session | null; // Tipagem para a sessão
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}