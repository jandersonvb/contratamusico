"use client";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { LogIn, LogOut, Mail, Tag, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Import do Auth.js (handle-auth)
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redireciona para a home ao sair
  };

  return (
    <header className="bg-background sticky top-0 z-40 flex w-full items-center justify-between border-b px-4 py-4 shadow-sm md:px-6">
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-lg font-bold text-black md:text-xl"
          >
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Contratamusico
            </span>
          </Link>
          <div className="hidden gap-4 md:flex">
            {/* <Link href="/sobre" className="flex items-center gap-2 text-black ">
              <Info className="text-lg" />
              Sobre nós
            </Link> */}
            <Link
              href="/contato"
              className="flex items-center gap-2 text-black"
            >
              <Mail className="text-lg" />
              Contato
            </Link>
            <Link href="/planos" className="flex items-center gap-2 text-black">
              <Tag className="text-lg" />
              Planos
            </Link>
          </div>
        </nav>
      </div>
      <div className="hidden flex-1 items-center justify-between space-x-2 md:flex md:justify-end">
        {/* Usuário autenticado */}
        {session ? (
          <Button
            variant="outline"
            className="border-border hover:bg-muted flex items-center gap-2 rounded-lg border text-center font-medium transition"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        ) : (
          <>
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="border-border hover:bg-muted rounded-lg border text-center font-medium transition"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-b-sm font-semibold transition"
              >
                <UserCheck className="h-4 w-4" />
                Cadastre-se
              </Button>
            </Link>
          </>
        )}
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
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
          <DropdownMenuContent align="start" className="w-48">
            {!session ? (
              <>
                <DropdownMenuItem>
                  <Link href="/auth/login" className="block w-full text-center">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/auth/signup"
                    className="block w-full text-center"
                  >
                    Cadastre-se
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={handleLogout}>
                <span className="block flex w-full items-center gap-2 text-center">
                  <LogOut className="h-4 w-4" /> Sair
                </span>
              </DropdownMenuItem>
            )}
            {/* <DropdownMenuItem>
              <Link href="/sobre" className="block w-full text-center">
                Sobre nós
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <Link href="/contato" className="block w-full text-center">
                Contato
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/planos" className="block w-full text-center">
                <Tag className="text-lg" />
                Planos
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
