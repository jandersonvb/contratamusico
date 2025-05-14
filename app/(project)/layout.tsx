import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";

import { dark } from "@clerk/themes";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      >
        <ClerkProvider
          appearance={{ baseTheme: dark }}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
