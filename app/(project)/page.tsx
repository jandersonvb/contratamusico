"use client";

import { Button } from "@/app/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <Image
        src="/logo.png"
        alt="Logo Contrata Músico"
        width={128}
        height={128}
        className="w-32 h-32"
      />

      <h1 className="text-3xl font-bold">Contrata Músico</h1>
      <p className="text-center text-sm text-gray-500">
        Conectando talentos musicais com oportunidades incríveis!
      </p>
      <p className="text-lg">Em breve, mais informações!</p>

      <Button
        onClick={() =>
          window.open("https://wa.me/5535998102070", "_blank", "noopener,noreferrer")
        }
        className="bg-primary hover:bg-primary/80 text-white"
      >
        Fale conosco no WhatsApp
      </Button>
    </main>
  );
}
