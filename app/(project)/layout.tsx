import type { Metadata } from "next";

import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner';
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { auth } from "../lib/auth";
import { db } from "../lib/firebase";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ContrataMúsico - Encontre o Músico Perfeito para Seu Evento",
  description: "A plataforma mais prática para contratar músicos qualificados de todo o Brasil. Crie seu perfil, explore talentos e contrate com facilidade.",
  openGraph: {
    title: 'ContrataMúsico - Encontre o Músico Perfeito para Seu Evento',
    description: 'A plataforma mais prática para contratar músicos qualificados de todo o Brasil. Crie seu perfil, explore talentos e contrate com facilidade.',
    url: 'https://www.contratamusico.com.br', // Substitua pela URL real
    siteName: 'ContrataMúsico',
    images: [
      {
        url: 'https://www.contratamusico.com.br/og-image.jpg', // Adicione uma imagem OG
        width: 1200,
        height: 630,
        alt: 'ContrataMúsico - Músicos para Eventos',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContrataMúsico - Encontre o Músico Perfeito para Seu Evento',
    description: 'A plataforma mais prática para contratar músicos qualificados de todo o Brasil. Crie seu perfil, explore talentos e contrate com facilidade.',
    images: ['https://www.contratamusico.com.br/twitter-image.jpg'], // Imagem para Twitter
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); // Obtém a sessão no Server Component
  let userRole = session?.user?.role || null; // Obter a role da sessão

  if (session?.user?.id) {
    try {
      const userRef = db.collection('users').doc(session.user.id);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        // A role deve vir do Firestore. Se não existir, será null.
        userRole = (userData?.role as 'musician' | 'contractor' | 'admin') || null;

        // Se o usuário está logado e não tem role, redireciona para onboarding
        // Isso é uma medida de segurança caso o redirect callback falhe
        if (!userRole && session.user.email) { // Verifica se há email para evitar redirecionamentos em loops
          // Não podemos usar redirect() diretamente aqui no layout se o children já foi renderizado.
          // A melhor forma é no callback 'redirect' do NextAuth ou na página dashboard.
          // Para evitar o erro de hidratação, é melhor que o Header receba a role correta.
          // Se for redirecionado no auth.ts, o layout nem seria totalmente renderizado.
        }

      }
    } catch (error) {
      console.error("Erro ao buscar role do usuário no Firestore:", error);
      // Log do erro, mas não impeça o render. O userRole será null.
    }
  }

  // Se o usuário está logado e não tem role, redireciona para onboarding
  // ISSO DEVE SER FEITO NA PÁGINA ESPECÍFICA DO DASHBOARD OU VIA CALLBACK DO NEXTAUTH
  // NO LAYOUT, É MAIS PARA GARANTIR QUE O HEADER TEM A INFO CORRETA
  if (session && !userRole && typeof window === 'undefined') { // Apenas no servidor
    // console.log("Usuário logado sem role, redirecionando para onboarding...");
    // redirect('/onboarding/select-role'); // Isso pode causar problemas se o Children já começou a renderizar
    // É mais seguro fazer isso no middleware ou no próprio dashboard/page.tsx
  }



  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col`}>
        <SessionProvider session={session}>

          <Header session={session} userRole={userRole} /> {/* Passa a sessão e a role para o Header */}
          {children}
          <Footer />
          <Toaster richColors position="bottom-right" /> {/* Configura o Toaster */}
        </SessionProvider>
      </body>
    </html >
  );
}
