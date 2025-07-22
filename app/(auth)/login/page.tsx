// app/auth/login/page.tsx
// Server Component para a página de Login.

import { LoginForm } from "@/app/(auth)/login/components/LoginForm/LoginForm";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

import Image from "next/image"; // Para a imagem lateral
import { SocialAuthButtons } from "./components/SocialAuthButtons/SocialAuthButtons";
import Link from "next/link";

export default async function LoginPage() {
  const session = await auth();

  // Redireciona o usuário para o dashboard se já estiver logado
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      <div className="bg-primary relative hidden w-1/2 items-center justify-center p-8 lg:flex">
        <Image
          src="/images/signup-background-music.jpg" // Caminho correto para a imagem dentro de public/images
          alt="Músico tocando"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-40"
        />
        <div className="relative z-10 space-y-4 px-8 text-center text-white">
          <h1 className="text-4xl leading-tight font-bold drop-shadow-md">
            O Som do Seu Evento Começa Aqui!
          </h1>
          <p className="text-lg font-light opacity-90">
            Conecte-se com os melhores talentos musicais do Brasil.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
        <div className="bg-card border-border w-full max-w-md space-y-8 rounded-lg border p-8 shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <Link
              href={session ? "/dashboard" : "/"}
              className="flex items-center gap-2"
            >
              <span className="text-foreground flex items-center text-2xl font-extrabold no-underline">
                <span className="text-2xl">Contrata</span>
                <span className="text-2xl text-primary ml-1">Musico</span>
                <Image
                  src="/logo.png" // Certifique-se de ter um arquivo logo.png na pasta public
                  alt="Logo ContrataMusico"
                  width={32}
                  height={32}
                  style={{ position: "relative", top: "-4px", right: "4px" }}
                />
              </span>
            </Link>
          </div>

          <div className="text-center">
            <h2 className=" text-2xl font-medium ">
              Faça Login
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Entre para encontrar ou ser encontrado por talentos musicais.
            </p>
          </div>

          <LoginForm />

          <div className="flex items-center px-6 py-4">
            <div className="mx-2 flex-grow border-t border-gray-300"></div>
            <span className="text-sm text-gray-500">ou</span>
            <div className="mx-2 flex-grow border-t border-gray-300"></div>
          </div>

          <SocialAuthButtons />

          <div className="text-muted-foreground text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
