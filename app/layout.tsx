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
  title: "Contrata Musico | encontre o músico ideal para sua banda",
  description: "Contrata Musico é uma plataforma que conecta músicos e bandas, facilitando a busca pelo músico ideal para sua banda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
