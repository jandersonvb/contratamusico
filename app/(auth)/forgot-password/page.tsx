// app/(auth)/forgot-password/page.tsx
// Server Component para a página de Esqueceu a Senha.
import { auth } from "@/app/lib/auth"; // Para autenticação e redirecionamento
import { redirect } from "next/navigation"; // Para redirecionamento no servidor

import Link from "next/link";
import Image from "next/image"; // Para a imagem lateral
import { ForgotPasswordForm } from "@/app/components/ForgotPasswordForm/ForgotPasswordForm"; // Importa o novo formulário

export default async function ForgotPasswordPage() {
  const session = await auth();

  // Se o usuário já estiver logado, redireciona para o dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      {/* Coluna da Esquerda: Imagem/Branding (Visível apenas em telas grandes) */}
      <div className="relative hidden w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-800 p-8 lg:flex">
        <Image
          src="/images/forgot-password-background-music.jpg" // Imagem temática de "memória" ou "solução"
          alt="Luz em um palco vazio"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-40"
        />
        <div className="relative z-10 space-y-4 px-8 text-center text-white">
          <h1 className="text-4xl leading-tight font-bold drop-shadow-md">
            O Som do Seu Evento Não Pode Parar!
          </h1>
          <p className="text-lg font-light opacity-90">
            Acontece. Vamos te ajudar a recuperar o acesso à sua conta
            rapidinho.
          </p>
        </div>
      </div>

      {/* Coluna da Direita: Formulário de Esqueceu a Senha */}
      <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
        <div className="bg-card border-border w-full max-w-md space-y-8 rounded-lg border p-8 shadow-lg">
          <div className="text-center">
            {/* Logo do ContrataMusico */}
            <Link
              href="/"
              className="text-foreground mb-6 inline-block text-3xl font-extrabold no-underline"
            >
              <span>Contrata</span>
              <span className="text-primary">Musico</span>
            </Link>
            <h2 className="text-foreground mt-2 text-3xl font-extrabold">
              Redefinir Sua Senha
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Informe seu e-mail para enviarmos um link de redefinição.
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
