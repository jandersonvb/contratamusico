import type { DefaultSession } from "next-auth";

// Idealmente em types/next-auth.d.ts ou no topo de route.ts/lib/auth.ts
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
}