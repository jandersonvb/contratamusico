import { CheckCircle, Search, UserPlus } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Input } from "../_components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/_components/ui/card";

export default async function Home() {
  const session = await auth();

  if (session) {
    // If the user is authenticated, redirect to the dashboard
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-20">
        <section className="mb-10 text-center md:mb-20">
          <h1 className="mb-4 text-3xl leading-tight font-bold md:mb-6 md:text-6xl">
            Encontre o Músico Perfeito para Seu Evento
          </h1>
          <p className="mb-6 text-base text-gray-600 md:mb-8 md:text-xl">
            A plataforma mais prática para contratar músicos de todo o Brasil
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Input
              type="text"
              placeholder="Buscar músicos cadastrados..."
              className="flex-1 border-gray-300"
            />
            <Link href="">
              <Button variant="default">Buscar músicos</Button>
            </Link>
          </div>
        </section>

        <section className="mb-10 grid grid-cols-1 gap-6 text-center md:mb-20 md:grid-cols-3 md:gap-10">
          <Card className="bg-white text-center text-black shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <UserPlus className="mx-auto mb-4 h-10 w-10 text-red-500 md:h-12 md:w-12" />
              <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
                Cadastro rápido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 md:text-base">
                Crie seu perfil em minutos e comece a ser encontrado.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white text-center text-black shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <Search className="mx-auto mb-4 h-10 w-10 text-red-500 md:h-12 md:w-12" />
              <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
                Busca inteligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 md:text-base">
                Filtre músicos por localização, estilo e disponibilidade.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white text-center text-black shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CheckCircle className="mx-auto mb-4 h-10 w-10 text-red-500 md:h-12 md:w-12" />
              <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
                Perfil verificado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 md:text-base">
                Perfis verificados garantem que você está lidando com músicos
                reais e confiáveis.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Pronto para começar?
          </h2>
          <p className="mb-4 text-sm text-gray-600 md:mb-6 md:text-base">
            Crie seu perfil agora ou encontre músicos ideais para o seu evento.
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <Link href="/auth/signup">
              <Button variant="default">Cadastrar músico</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">Explorar músicos</Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
