// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Estende a interface Session para incluir propriedades personalizadas
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null; // Corresponde a 'picture' no JWT e 'image' da sessão
      role?: "musician" | "contractor" | "admin" | null; // Adiciona 'role'
    } & DefaultSession["user"];
  }

  // Estende a interface User (do adaptador) para incluir propriedades personalizadas
  interface User extends DefaultUser {
    role?: "musician" | "contratante" | "admin" | null;
    // Adicione outras propriedades do seu User do DB aqui se o adaptador as retornar
    // ex: googleId?: string; facebookId?: string; picture?: string;
  }
}

// Estende a interface JWT para incluir propriedades personalizadas do token interno
declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // ID do usuário do DB
    role?: "musician" | "contratante" | "admin" | null; // Role do usuário
    picture?: string | null; // URL da imagem de perfil
  }
}