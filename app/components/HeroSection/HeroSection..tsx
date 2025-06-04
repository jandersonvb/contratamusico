// components/HeroSection/HeroSection.tsx
'use client'; // Se a lógica de seleção de "contratar/ser músico" envolver estado
import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input"; // Importar Input

export function HeroSection() {
  const [isMusicianMode, setIsMusicianMode] = useState(false); // Estado para alternar entre "contratar" e "ser músico"

  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gray-100 text-gray-900 md:min-h-[700px]">
      {/* Opcional: Adicionar um SVG de onda, partículas, ou ilustração de fundo que não tire o foco */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">

        <h1 className="mb-6 text-2xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Conectando Talentos Musicais a Momentos Inesquecíveis.
        </h1>
        <p className="mb-10 text-base md:text-xl opacity-90">
          A plataforma definitiva para encontrar o músico perfeito ou divulgar sua arte.
        </p>

        {/* Selector para o modo de uso (contratar vs. músico) */}
        <div className="mb-8 flex justify-center gap-4">
          <Button
            variant={isMusicianMode ? "outline" : "default"}
            onClick={() => setIsMusicianMode(false)}

          >
            Quero Contratar
          </Button>
          <Button
            variant={isMusicianMode ? "default" : "outline"}
            onClick={() => setIsMusicianMode(true)}

          >
            Sou Músico
          </Button>
        </div>

        {/* Conteúdo dinâmico baseado no modo selecionado */}
        {isMusicianMode ? (
          <div className="mt-8">
            <p className="mb-4 text-xl font-semibold">Leve sua música para novos palcos!</p>
            <Link href="/auth/signup">
              <Button variant="outline" className="text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white text-lg px-8 py-3">
                Cadastre-se Agora
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center gap-2 max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Busque por estilo, instrumento, cidade..."
              className="flex-1 bg-white text-gray-800 placeholder:text-gray-500 py-3 px-5 rounded-full text-lg border-none focus:ring-2 focus:ring-gray-400"
            />
            <Button variant="outline" className="bg-gray-900 text-white hover:bg-gray-700 px-6 py-3 rounded-full text-lg">
              Buscar
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}