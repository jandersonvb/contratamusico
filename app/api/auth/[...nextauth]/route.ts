
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth"; // Importa as opções de autenticação definidas em lib/auth.ts

// Cria o handler do NextAuth.js usando as opções importadas.
const handler = NextAuth(authOptions);

// Exporta os handlers GET e POST para que o Next.js App Router os reconheça como API Route.
export { handler as GET, handler as POST };