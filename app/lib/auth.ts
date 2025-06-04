// lib/auth.ts
import NextAuth, { type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"; // Importado corretamente
import { FirestoreAdapter } from "@auth/firebase-adapter"; // Importado corretamente
import { firebaseCert } from "./firebase"; // Certifique-se de que é o config do Firebase Admin SDK

// IMPORTANTE: Estenda a interface Session e User para incluir 'role' e 'image'
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null; // Adiciona 'image'
      role?: 'musician' | 'contractor' | 'admin' | null; // Adiciona 'role'
    } & DefaultSession["user"];
  }

  interface User {
    role?: 'musician' | 'contractor' | 'admin' | null; // Adiciona 'role' ao User do adaptador
  }
}

declare module "next-auth" {
  interface JWT {
    id?: string;
    role?: 'musician' | 'contractor' | 'admin' | null;
    picture?: string | null; // Para o token JWT
  }
}


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({ // Verifique se você tem Client ID e Secret para Facebook
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: firebaseCert, // Assumindo que firebaseCert já é importado corretamente
  }),
  session: {
    strategy: "jwt", // Mesmo usando adaptador, NextAuth por padrão usa JWT para a sessão.
    // Se você quer que a sessão do cliente reflita o DB, o JWT precisa estar atualizado.
  },
  callbacks: {
    async session({ session, token, user }) {
      // Quando strategy: "jwt", 'token' é a fonte principal para a sessão do cliente.
      // 'user' só é preenchido se strategy for "database"
      // No entanto, FirestoreAdapter usa 'database' strategy internamente para gerenciar usuários,
      // mas a sessão enviada ao cliente pode ser JWT.
      // Então, precisamos garantir que o JWT reflita o DB.

      if (token) {
        session.user.id = token.sub ?? ""; // token.sub é o ID do usuário, fallback para string vazia
        session.user.name = token.name;
        session.user.email = token.email ?? ""; // Fallback to an empty string if token.email is undefined
        session.user.image = token.picture; // A imagem já deve vir no token do provedor
        session.user.role = token.role as 'musician' | 'contractor' | 'admin' | null; // Adicione o role do token
      }
      // TODO: Se 'token.role' não vier automaticamente do provedor,
      // você precisará buscá-lo do seu Firestore aqui ou no callback 'jwt'.
      // Exemplo (se o user object do adaptador tiver a role):
      // if (user) {
      //   session.user.role = user.role as UserRole;
      // }

      return session;
    },
    async jwt({ token, user, account, profile }) {
      // 'user' vem do adaptador (Firestore)
      // 'profile' vem do provedor (Google/Facebook)
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image; // Garante que a imagem do DB/provedor vá para o token
        token.role = (user as any).role; // Garante que a role do DB vá para o token
      }
      // Para garantir que o 'picture' do provedor vá para o token na primeira autenticação:
      if (account && profile) {
        token.picture = profile.picture || token.picture; // Prioriza profile.picture se existir
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Se o usuário já está logado e o URL de destino é o dashboard,
      // mas ele não tem uma role definida, redireciona para a página de seleção de role.
      // Essa verificação é feita no CLIENTE (via useSession ou useEffect no dashboard/page.tsx)
      // ou de forma mais robusta no middleware.
      // A consulta ao DB dentro do redirect callback pode ser um gargalo.

      // Para evitar o erro de hidratação, garantimos que a role esteja na sessão/token.
      // Se a role não está no token, é porque não está no DB ou não foi propagada.
      // O redirecionamento real para onboarding é melhor feito no dashboard/page.tsx
      // ou um middleware, após o login.

      // Por enquanto, mantenha o redirect callback simples:
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
  }
});