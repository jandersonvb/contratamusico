// Removed import for Metadata as it is not exported by "next"

import { Toaster } from "sonner";

import { SessionProvider } from "next-auth/react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { auth } from "../lib/auth";
import { db } from "../lib/firebase";

export const metadata = {
  title: "ContrataMúsico - Encontre o Músico Perfeito para Seu Evento",
  description:
    "A plataforma mais prática para contratar músicos qualificados de todo o Brasil. Crie seu perfil, explore talentos e contrate com facilidade.",
  openGraph: {
    title: "ContrataMúsico - Encontre o Músico Perfeito para Seu Evento",
    description:
      "A plataforma mais prática para contratar músicos qualificados de todo o Brasil. Crie seu perfil, explore talentos e contrate com facilidade.",
    url: "https://www.contratamusico.com.br", // Substitua pela URL real
    siteName: "ContrataMúsico",
    images: [
      {
        url: "https://www.contratamusico.com.br/og-image.jpg", // Adicione uma imagem OG
        width: 1200,
        height: 630,
        alt: "ContrataMúsico - Músicos para Eventos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContrataMúsico - Encontre o Músico Perfeito para Seu Evento",
    description:
      "A plataforma mais prática para contratar músicos qualificados de todo o Brasil. Crie seu perfil, explore talentos e contrate com facilidade.",
    images: ["https://www.contratamusico.com.br/twitter-image.jpg"], // Imagem para Twitter
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); // Obtém a sessão no Server Component
  let userRole = session?.user?.role || null; // Obter a role da sessão

  if (session?.user?.id) {
    try {
      const userRef = db.collection("users").doc(session.user.id);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        userRole =
          (userData?.role as "musician" | "contractor" | "admin") || null;

        if (!userRole && session.user.email) {
        }
      }
    } catch (error) {
      console.error("Erro ao buscar role do usuário no Firestore:", error);
      // Log do erro, mas não impeça o render. O userRole será null.
    }
  }

  if (session && !userRole && typeof window === "undefined") {
  }

  return (
    <SessionProvider session={session}>
      <Header session={session} userRole={userRole} />{" "}
      {/* Passa a sessão e a role para o Header */}
      {children}
      <Footer />
      <Toaster richColors position="bottom-right" /> {/* Configura o Toaster */}
    </SessionProvider>
  );
}
