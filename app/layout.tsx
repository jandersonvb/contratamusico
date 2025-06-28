import { Roboto } from "next/font/google";

import "./(main)/globals.css";

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'], // Escolha os pesos que você usará
  subsets: ['latin'],
  variable: '--font-roboto', // Defina uma variável CSS para a fonte
  display: 'swap', // Melhorar o carregamento da fonte
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
    <html lang="pt-BR" className={roboto.variable}>
      <body className="font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
