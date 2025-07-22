// app/lib/auth.ts
// Este arquivo atua como um helper para facilitar o acesso à autenticação
// Ele NÃO deve conter a chamada NextAuth() nem exportar os handlers (GET, POST).

import { getServerSession } from "next-auth"; // Para obter a sessão no servidor
import type { DefaultSession, DefaultUser } from "next-auth"; // Para estender os tipos do NextAuth
import { authOptions } from "../api/auth/[...nextauth]/route"; // Importa as opções de configuração do NextAuth.js do ARQUIVO DE ROTA DA API

// IMPORTANT: Estenda as interfaces Session, User, JWT para incluir suas propriedades personalizadas.
// RECOMENDAÇÃO: Idealmente, mova estas declarações para um arquivo de tipos global
// (ex: `types/next-auth.d.ts` na raiz do seu projeto ou em `src/types/next-auth.d.ts`).
// Isso garante que os tipos estejam disponíveis globalmente e evita redefinições.
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "musician" | "contractor" | "admin" | null;
    } & DefaultSession["user"]; // Estende os tipos padrão do NextAuth.js
  }

  interface User extends DefaultUser { // Estende DefaultUser para adicionar 'role' e outras propriedades
    role?: "musician" | "contractor" | "admin" | null;
    // Adicione outras propriedades personalizadas do seu 'User' aqui se necessário (ex: googleId, facebookId)
    // CUIDADO: Estas são para o objeto 'User' retornado pelos Providers, não para o token diretamente.
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "musician" | "contratante" | "admin" | null;
    picture?: string | null; // Mapeia para 'image' na sessão
  }
}

// 1. Exporta as funções signIn e signOut para uso em Client Components
export { signIn, signOut } from "next-auth/react";

// 2. Exporta a função `auth` para uso em Server Components e Server Actions
// Ela obtém a sessão do lado do servidor usando as `authOptions` definidas no arquivo de rota da API.
export async function auth() {
  return await getServerSession(authOptions);
}