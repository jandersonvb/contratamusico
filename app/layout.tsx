// app/layout.tsx

// Importe Metadata diretamente de "next".

import "../app/globals.css";

import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Tipagem explícita para metadata
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

export default async function RootLayout({
  // Tipagem direta para children como React.ReactNode, que é o que o Next.js espera.
  // Isso evita qualquer conflito com uma 'LayoutProps' externa que possa exigir 'types'.
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
