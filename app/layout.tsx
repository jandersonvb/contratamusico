import { Inter, Poppins } from "next/font/google";
import "./(main)/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
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
