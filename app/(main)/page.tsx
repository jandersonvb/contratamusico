// app/(main)/page.tsx
// Este é um Server Component, otimizado para SEO e performance inicial.

import { auth } from "@/app/lib/auth"; // Para autenticação e redirecionamento
import { redirect } from "next/navigation"; // Para redirecionamento no servidor
import { HeroSection } from "../components/HeroSection/HeroSection.";
import { ProblemSolutionSection } from "../components/ProblemSolutionSection/ProblemSolutionSection";
import { KeyFeaturesSection } from "../components/KeyFeaturesSection/KeyFeaturesSection";
import { FeaturedMusiciansSection } from "../components/FeaturedMusiciansSection/FeaturedMusiciansSection";
import { TestimonialsSection } from "../components/TestimonialsSection/TestimonialsSection";
import { CallToActionSection } from "../components/CallToActionSection/CallToActionSection";

export default async function HomePage() {
  const session = await auth();

  // Se o usuário estiver autenticado, redireciona para o dashboard.
  // Esta lógica é executada no servidor, antes da renderização de qualquer UI.
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col">
      {/* 1. Seção Hero: Fundo de largura total, conteúdo centralizado */}
      <HeroSection />

      {/* 2. Seção de Propósito: Quem somos e como resolvemos problemas */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <ProblemSolutionSection />
      </section>

      {/* 3. Seção de Benefícios Chave: Diferenciais da plataforma */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <KeyFeaturesSection />
      </section>

      {/* 4. Seção de Músicos em Destaque: Mostra o valor da plataforma */}
      <section className="bg-muted/20 container mx-auto rounded-lg px-4 py-16 md:py-24">
        <FeaturedMusiciansSection />
      </section>

      {/* 5. Seção de Testemunhos: Prova social para construir confiança */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <TestimonialsSection />
      </section>

      {/* 6. Seção de Chamada para Ação Final: Guia o usuário para o próximo passo */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <CallToActionSection />
      </section>
    </main>
  );
}
