import { auth } from "@/app/lib/auth"; // Para autenticação e redirecionamento
import { redirect } from "next/navigation"; // Para redirecionamento no servidor

import { SignupForm } from "@/app/(auth)/signup/components/SignupForm/SignupForm"; // Importa o novo formulário de cadastro
import Image from "next/image"; // Para a imagem lateral

export default async function SignupPage() {
  const session = await auth();

  // Se o usuário já estiver logado, redireciona para o dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      {/* Coluna da Esquerda: Imagem/Branding (Visível apenas em telas grandes) */}
      <div className="bg-primary relative hidden w-1/2 items-center justify-center p-8 lg:flex">
        <Image
          src="/images/login-background-music.jpg" // Uma imagem diferente para o cadastro, se desejar
          alt="Pessoas colaborando com música"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-40"
        />
        <div className="relative z-10 space-y-4 px-8 text-center text-white">
          <h1 className="text-4xl leading-tight font-bold drop-shadow-md">
            Seu Palco, Sua Tribo. Conecte-se!
          </h1>
          <p className="text-lg font-light opacity-90">
            Junte-se à maior comunidade de talentos musicais e contratantes.
          </p>
        </div>
      </div>

      {/* Coluna da Direita: Formulário de Cadastro */}
      <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
        <div className="bg-card border-border w-full max-w-md space-y-8 rounded-lg border p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-foreground mt-2 text-3xl font-extrabold">
              Crie Sua Conta Grátis
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Seja músico ou contratante, o som perfeito está a um clique.
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
