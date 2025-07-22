// app/api/auth/[...nextauth]/route.ts
// Este é o arquivo principal de configuração da API de autenticação do NextAuth.js.

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth"; // Importação de tipo para NextAuthOptions
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. Provedor de Credenciais (E-mail e Senha)
    CredentialsProvider({
      name: "Email e Senha",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        // Esta função é executada NO SERVIDOR Next.js.
        // Ela faz a requisição para o seu backend NestJS para validar as credenciais.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("E-mail e senha são obrigatórios.");
        }

        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;

        try {
          const res = await fetch(`${backendUrl}/auth/login`, { // Chama o endpoint de login do seu NestJS
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Erro do backend no login de credenciais:", errorData);
            // Lança um erro que será capturado pelo `signIn` do cliente
            throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || errorData.error || "Credenciais inválidas.");
          }

          const user = await res.json(); // O NestJS retorna { id, fullName, email, accountType, picture }
          // Mapeia os dados do NestJS para a estrutura do NextAuth.js User
          if (user && user.id) { // Verifica se o usuário e o ID existem
            return {
              id: user.id,
              email: user.email,
              name: user.fullName, // Mapeia fullName do backend para name do NextAuth session
              image: user.picture || null, // Mapeia picture do backend para image do NextAuth session
              role: user.accountType, // Mapeia accountType do backend para role do NextAuth session
            };
          } else {
            return null; // Credenciais inválidas ou usuário não encontrado no backend
          }
        } catch (e: any) {
          console.error("Erro de rede/backend no NextAuth CredentialProvider:", e);
          throw new Error(e.message || "Erro ao conectar com o servidor de autenticação.");
        }
      },
    }),

    // 2. Provedor do Google
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent", // Força o Google a pedir consentimento toda vez
          access_type: "offline", // Para obter refresh tokens se precisar
          response_type: "code",
        },
      },
      async profile(profile, tokens) {
        // Este `profile` é o que o Google retorna (dados brutos do provedor).
        // Chame o endpoint `social-login-callback` do seu backend NestJS para criar/vincular o usuário no seu DB.
        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
        try {
          const res = await fetch(`${backendUrl}/auth/social-login-callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile.email,
              fullName: profile.name,
              socialId: profile.sub, // 'sub' é o ID do usuário no Google
              provider: 'google',
              picture: profile.picture, // URL da foto de perfil do Google
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Erro do backend no Google profile callback:", errorData);
            throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || errorData.error || "Erro ao processar login Google.");
          }

          const backendUser = await res.json(); // backendUser é o Omit<User, 'password'> retornado pelo NestJS
          // Retorna a estrutura que o NextAuth.js espera para o `user` na sessão.
          return {
            id: backendUser.id,
            name: backendUser.fullName,
            email: backendUser.email,
            image: backendUser.picture || profile.picture || null,// Prioriza a imagem do backend, senão a do Google
            role: backendUser.accountType, // Adiciona a role (accountType) do backend
          };
        } catch (e: any) {
          console.error("Erro ao chamar backend para usuário Google:", e);
          throw new Error(e.message || "Erro ao conectar com o backend para login Google.");
        }
      },
    }),

    // 3. Provedor do Facebook
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'email,public_profile',
        },
      },
      async profile(profile, tokens) {
        // Este `profile` é o que o Facebook retorna (dados brutos do provedor).
        // Chame o endpoint `social-login-callback` do seu backend NestJS.
        const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;
        try {
          const res = await fetch(`${backendUrl}/auth/social-login-callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile.email, // Facebook pode precisar de permissão extra para email (scope)
              fullName: profile.name,
              socialId: profile.id, // 'id' é o ID do usuário no Facebook
              provider: 'facebook',
              picture: profile.picture?.data?.url, // URL da foto de perfil do Facebook
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Erro do backend no Facebook profile callback:", errorData);
            throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || errorData.error || "Erro ao processar login Facebook.");
          }

          const backendUser = await res.json(); // backendUser é o Omit<User, 'password'> retornado pelo NestJS
          // Retorna a estrutura que o NextAuth.js espera para o `user` na sessão.
          return {
            id: backendUser.id,
            name: backendUser.fullName,
            email: backendUser.email,
            image: backendUser.picture || profile.picture?.data?.url || null, // Prioriza a imagem do backend
            role: backendUser.accountType, // Adiciona a role (accountType) do backend
          };
        } catch (e: any) {
          console.error("Erro ao chamar backend para usuário Facebook:", e);
          throw new Error(e.message || "Erro ao conectar com o backend para login Facebook.");
        }
      },
    }),
  ],

  // Configuração de Callbacks (Como a sessão é gerenciada)
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // 'user' é o objeto retornado por 'authorize' (Credenciais) ou 'profile' (Google/Facebook)
      // 'account' contém info do OAuth (provider, access_token do Google/Facebook)
      // 'profile' é o perfil bruto do provedor (Google/Facebook)
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role; // Adiciona a role ao token JWT interno do NextAuth
        token.picture = user.image; // Adiciona a imagem ao token JWT interno
      }
      // Se a imagem ou role não vieram do 'user' (que é do DB), tente pegar do 'profile' do provedor
      if (profile) {
        token.picture = (profile as any).picture || (profile as any).image || token.picture;
        // Se a role não for definida pelo seu backendUser, defina um fallback aqui.
        // token.role = (profile as any).role || token.role;
      }
      return token;
    },
    async session({ session, token }) {
      // 'session' é o objeto que será exposto no cliente via useSession()
      // 'token' é o que foi retornado pelo callback `jwt`
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.picture as string | null; // Atribua a imagem à sessão exposta
      const roleMapping: Record<string, "musician" | "contractor" | "admin" | null> = {
        musico: "musician",
        contratante: "contractor",
        admin: "admin",
      };
      session.user.role = roleMapping[token.role as string] || null; // Map and assign the role
      return session;
    },
  },

  // Configuração de Páginas Customizadas
  pages: {
    signIn: "/login", // Página de login customizada
    // error: "/auth/error", // Opcional: para páginas de erro customizadas do NextAuth.js
  },

  // Adapters (Para persistir sessões em banco de dados)
  // REMOVA O ADAPTER SE VOCÊ NÃO FOR USAR FIREBASE/FIRESTORE PARA GERENCIAR SESSÕES.
  // adapter: FirestoreAdapter({ credential: firebaseCert }),

  // Outras configurações
  secret: process.env.AUTH_SECRET, // Use o segredo do .env
  session: {
    strategy: "jwt", // Usa estratégia JWT para sessões baseadas em cookies
    maxAge: 30 * 24 * 60 * 60, // 30 dias de validade do cookie de sessão
  },
  // Debug mode (útil para desenvolvimento)
  debug: process.env.NODE_ENV === "development",
};

// EXPORTAR DIRETAMENTE OS HANDLERS GET e POST AQUI para Next.js App Router
// Este é o padrão para o Next.js App Router.
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };