import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = Inter({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Contrata Musico - Encontre o Músico Ideal",
  description:
    "Contrata Musico é uma plataforma que conecta músicos e bandas, facilitando a busca pelo músico ideal para sua banda.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
        {children}
      </body>
    </html>
  );
}
