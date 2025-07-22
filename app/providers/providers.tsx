// app/providers.tsx
"use client"; // <--- ESTE É CRUCIAL

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}