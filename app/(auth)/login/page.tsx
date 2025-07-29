"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { SocialAuthButtons } from "./components/SocialAuthButtons/SocialAuthButtons";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div className="flex min-h-screen">
      <div className="bg-primary relative hidden w-1/2 items-center justify-center p-8 lg:flex">
        <Image
          src="/images/signup-background-music.jpg"
          alt="Músico tocando"
          fill
          sizes="100vw"
          className="absolute inset-0 z-0 opacity-40 object-cover"
        />
        <div className="relative z-10 space-y-4 px-8 text-center text-white">
          <h1 className="text-4xl font-bold drop-shadow-md">
            O Som do Seu Evento Começa Aqui!
          </h1>
          <p className="text-lg font-light opacity-90">
            Conecte-se com os melhores talentos musicais do Brasil.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
        <div className="bg-card border w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-medium">Faça Login</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Entre para encontrar ou ser encontrado por talentos musicais.
            </p>
          </div>

          <LoginForm />

          <div className="flex items-center px-6 py-4">
            <div className="mx-2 flex-grow border-t border-gray-300" />
            <span className="text-sm text-gray-500">ou</span>
            <div className="mx-2 flex-grow border-t border-gray-300" />
          </div>

          <SocialAuthButtons />

          <p className="text-muted-foreground text-center text-sm mt-4">
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
