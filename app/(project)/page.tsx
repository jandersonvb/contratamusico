import {
  UserPlus,
  Search,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/app/_components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Input } from "../_components/ui/input";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard"); // Redirect to the home page if the user is already logged in
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-between border-b px-4 py-4 backdrop-blur md:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-lg font-bold text-white md:text-xl"
          >
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <span className="text-white">ContrataMúsico</span>
          </Link>
          <nav className="hidden items-center justify-center gap-4 text-sm font-medium md:flex">
            <a href="#" className="text-white hover:underline">
              Buscar músicos
            </a>
            <a href="#" className="text-white hover:underline">
              Sou músico
            </a>
          </nav>
        </div>
        <div className="hidden flex-1 items-center justify-between space-x-2 md:flex md:justify-end">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              className="border-border hover:bg-muted rounded-lg border text-center font-medium transition"
            >
              Login
            </Button>
          </Link>

          <Link href="/auth/signup">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-b-sm font-semibold transition"
            >
              Cadastre-se
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/auth/login" className="block w-full text-center">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/auth/signup" className="block w-full text-center">
                  Cadastre-se
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-20">
        <section className="mb-10 text-center md:mb-20">
          <h1 className="mb-4 text-3xl leading-tight font-bold md:mb-6 md:text-6xl">
            Encontre o Músico Perfeito para Seu Evento
          </h1>
          <p className="text-muted-foreground mb-6 text-base md:mb-8 md:text-xl">
            A plataforma mais prática para contratar músicos de todo o Brasil
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Input
              type="text"
              placeholder="Buscar músicos cadastrados..."
              className="flex-1"
            />
            <Link href="">
              <Button variant="default">Buscar músicos</Button>
            </Link>
          </div>
        </section>

        {/* Benefícios */}
        <section className="mb-10 grid grid-cols-1 gap-6 text-center md:mb-20 md:grid-cols-3 md:gap-10">
          <div>
            <UserPlus className="text-primary mx-auto mb-4 h-10 w-10 md:h-12 md:w-12" />
            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              Cadastro rápido
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Crie seu perfil em minutos e comece a ser encontrado.
            </p>
          </div>
          <div>
            <Search className="text-primary mx-auto mb-4 h-10 w-10 md:h-12 md:w-12" />
            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              Busca inteligente
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Filtre músicos por localização, estilo e disponibilidade.
            </p>
          </div>
          <div>
            <CheckCircle className="text-primary mx-auto mb-4 h-10 w-10 md:h-12 md:w-12" />
            <h3 className="mb-2 text-xl font-bold md:text-2xl">
              Perfil verificado
            </h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Perfis verificados garantem que você está lidando com músicos
              reais e confiáveis.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground mb-4 text-sm md:mb-6 md:text-base">
            Crie seu perfil agora ou encontre músicos ideais para o seu evento.
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <Link href="/auth/signup">
              <Button variant="default">Cadastrar músico</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Explorar músicos</Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background mt-30 w-full py-4 text-center">
          <div className="mb-4 flex justify-center gap-4">
            <Link
              href="#"
              // target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary transition"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              // target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-primary transition"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              // target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition"
            >
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
          <p>
            &copy; {new Date().getFullYear()} ContrataMúsico. Todos os direitos
            reservados.
          </p>
        </footer>
      </div>
    </main>
  );
}
