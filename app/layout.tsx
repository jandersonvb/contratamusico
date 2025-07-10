import { Inter, Poppins } from "next/font/google";

import "./(main)/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ContrataMúsico - Encontre o Músico Perfeito para Seu Evento",
  description:
    "A plataforma mais prática para contratar músicos qualificados de todo o Brasil. Crie seu perfil, explore talentos e contrate com facilidade.",
};

export default async function RootLayout({
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
