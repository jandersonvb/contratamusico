// components/HeroSection/HeroSection.tsx
// 'use client'; // Se a lógica de seleção de "contratar/ser músico" envolver estado
// import React, { useState } from 'react';
// import Link from "next/link";
// import { Button } from "@/app/_components/ui/button";
// import { Input } from "@/app/_components/ui/input"; // Importar Input

// export function HeroSection() {
//   const [isMusicianMode, setIsMusicianMode] = useState(false); // Estado para alternar entre "contratar" e "ser músico"

//   return (
//     <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gray-100 text-gray-900 md:min-h-[700px]">
//       {/* Opcional: Adicionar um SVG de onda, partículas, ou ilustração de fundo que não tire o foco */}
//       <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">

//         <h1 className="mb-6 text-2xl font-extrabold leading-tight tracking-tight md:text-5xl">
//           Conectando Talentos Musicais a Momentos Inesquecíveis.
//         </h1>
//         <p className="mb-10 text-base md:text-xl opacity-90">
//           A plataforma definitiva para encontrar o músico perfeito ou divulgar sua arte.
//         </p>

//         {/* Selector para o modo de uso (contratar vs. músico) */}
//         <div className="mb-8 flex justify-center gap-4">
//           <Button
//             variant={isMusicianMode ? "outline" : "default"}
//             onClick={() => setIsMusicianMode(false)}

//           >
//             Quero Contratar
//           </Button>
//           <Button
//             variant={isMusicianMode ? "default" : "outline"}
//             onClick={() => setIsMusicianMode(true)}

//           >
//             Sou Músico
//           </Button>
//         </div>

//         {/* Conteúdo dinâmico baseado no modo selecionado */}
//         {isMusicianMode ? (
//           <div className="mt-8">
//             <p className="mb-4 text-xl font-semibold">Leve sua música para novos palcos!</p>
//             <Link href="/auth/signup">
//               <Button variant="outline" className="text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white text-lg px-8 py-3">
//                 Cadastre-se Agora
//               </Button>
//             </Link>
//           </div>
//         ) : (
//           <div className="flex w-full items-center justify-center gap-2 max-w-2xl mx-auto">
//             <Input
//               type="text"
//               placeholder="Busque por estilo, instrumento, cidade..."
//               className="flex-1 bg-white text-gray-800 placeholder:text-gray-500 py-3 px-5 rounded-full text-lg border-none focus:ring-2 focus:ring-gray-400"
//             />
//             <Button variant="outline" className="bg-gray-900 text-white hover:bg-gray-700 px-6 py-3 rounded-full text-lg">
//               Buscar
//             </Button>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

// app/components/landing/HeroSection.tsx
"use client"; // Pode ser Client Component se houver interatividade (busca, animações)

import { Button } from "@/app/_components/ui/button";
import { Search, UserCheck } from "lucide-react"; // Ícones
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="from-primary relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-gradient-to-br to-blue-800 text-center text-white md:h-[700px]">
      {/* Imagem de Fundo (Exemplo) */}
      <Image
        src="/images/hero-background.jpg" // Coloque uma imagem impactante na pasta public/images
        alt="Músicos se apresentando em um palco iluminado"
        layout="fill"
        objectFit="cover"
        priority // Carrega prioritariamente para a primeira tela
        className="z-0 opacity-50"
      />
      {/* Overlay Escuro para Legibilidade */}
      <div className="absolute inset-0 z-0 bg-black opacity-40"></div>

      {/* Conteúdo Principal */}
      <div className="z-10 container mx-auto space-y-6 px-4">
        <h1 className="text-4xl leading-tight font-extrabold drop-shadow-lg sm:text-5xl lg:text-6xl">
          Conectando o Ritmo do Seu Evento com Talentos Excepcionais
        </h1>
        <p className="mx-auto max-w-3xl text-lg font-light drop-shadow-md sm:text-xl lg:text-2xl">
          Encontre o músico perfeito para qualquer ocasião ou seja descoberto
          por quem busca seu som.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/musicos">
            <Button size="lg" variant="default">
              <Search className="mr-2 h-5 w-5" /> Encontrar Músicos
            </Button>
          </Link>
          <Link href="/cadastro-musico">
            <Button size="lg" variant="secondary">
              <UserCheck className="mr-2 h-5 w-5" /> Cadastre-se Grátis
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
