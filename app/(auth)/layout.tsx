// app/auth/layout.tsx
// Este layout minimalista é para rotas de autenticação (login, cadastro, etc.)
// Ele NÃO inclui o Header e Footer globais.

import { Toaster } from "sonner";
import { AuthProvider } from "../providers/providers";

export const metadata = {
  title: "Autenticação - ContrataMusico",
  description: "Faça login ou cadastre-se na plataforma ContrataMusico.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}{" "}
      {/* APENAS o conteúdo da página de autenticação (Login, SignUp) será renderizado aqui */}
      <Toaster />
    </AuthProvider>
  );
}
