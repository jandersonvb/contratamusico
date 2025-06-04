// // app/page.tsx
// import { CheckCircle, Search, UserPlus } from "lucide-react"; // Search será movido para SearchBar

// import { Button } from "@/app/_components/ui/button";

// import { auth } from "@/app/lib/auth";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// // import { Input } from "../_components/ui/input"; // Não precisa mais aqui
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/app/_components/ui/card";
// import { SearchBar } from "../components/SearchBar/SarchBar";

// export default async function Home() {
//   const session = await auth();

//   if (session) {
//     redirect("/dashboard");
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 text-black">
//       <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-20">
//         <section className="mb-10 text-center md:mb-20">
//           <h1 className="mb-4 text-3xl leading-tight font-bold md:mb-6 md:text-6xl">
//             Encontre o Músico Perfeito para Seu Evento
//           </h1>
//           <p className="mb-6 text-base text-gray-600 md:mb-8 md:text-xl">
//             A plataforma mais prática para contratar músicos de todo o Brasil
//           </p>
//           {/* Substitui o input e botão de busca */}
//           <SearchBar />
//         </section>

//         <section className="mb-10 grid grid-cols-1 gap-6 text-center md:mb-20 md:grid-cols-3 md:gap-10">
//           <Card className="bg-white text-center text-black shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//             <CardHeader>
//               <UserPlus className="mx-auto mb-4 h-10 w-10 text-red-500 md:h-12 md:w-12" />
//               <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
//                 Cadastro rápido
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-600 md:text-base">
//                 Crie seu perfil em minutos e comece a ser encontrado.
//               </p>
//             </CardContent>
//           </Card>
//           <Card className="bg-white text-center text-black shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//             <CardHeader>
//               {/* Removido o ícone Search daqui, pois está no SearchBar */}
//               <Search className="mx-auto mb-4 h-10 w-10 text-red-500 md:h-12 md:w-12" /> {/* Corrigido: Search ainda está aqui na card, mantido como estava */}
//               <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
//                 Busca inteligente
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-600 md:text-base">
//                 Filtre músicos por localização, estilo e disponibilidade.
//               </p>
//             </CardContent>
//           </Card>
//           <Card className="bg-white text-center text-black shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//             <CardHeader>
//               <CheckCircle className="mx-auto mb-4 h-10 w-10 text-red-500 md:h-12 md:w-12" />
//               <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
//                 Perfil verificado
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-600 md:text-base">
//                 Perfis verificados garantem que você está lidando com músicos
//                 reais e confiáveis.
//               </p>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="text-center">
//           <h2 className="mb-4 text-2xl font-bold md:text-3xl">
//             Pronto para começar?
//           </h2>
//           <p className="mb-4 text-sm text-gray-600 md:mb-6 md:text-base">
//             Crie seu perfil agora ou encontre músicos ideais para o seu evento.
//           </p>
//           <div className="flex flex-col justify-center gap-4 md:flex-row">
//             <Link href="/auth/signup">
//               <Button variant="default">Cadastrar músico</Button>
//             </Link>
//             <Link href="/musicos"> {/* Alterado para uma rota de listagem */}
//               <Button variant="secondary">Explorar músicos</Button>
//             </Link>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// app/page.tsx
// import { auth } from "@/app/lib/auth";
// import { redirect } from "next/navigation";

// import { FeatureCardsSection } from "../components/FeatureCardsSection/FeatureCardsSection";
// import { HeroSection } from "../components/HeroSection/HeroSection.";

// export default async function Home() {
//   const session = await auth();

//   // Se o usuário estiver autenticado, redireciona para o dashboard.
//   // Esta é uma lógica de servidor (Server Component).
//   if (session) {
//     redirect("/dashboard");
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 text-black">
//       <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-20">
//         {/* Componente da Seção Hero */}
//         <HeroSection />

//         {/* Componente da Seção de Cartões de Funcionalidades */}
//         <FeatureCardsSection />

//         {/* Componente da Seção de Chamada para Ação */}
//         {/* <CallToActionSection /> */}
//       </div>
//     </main>
//   );
// }

// app/page.tsx
// import { auth } from "@/app/lib/auth";
// import { redirect } from "next/navigation";

// import { HowItWorksSection } from "../components/HowItWorksSection/HowItWorksSection";
// import { FeaturedMusiciansSection } from "../components/FeaturedMusiciansSection/FeaturedMusiciansSection";
// import { CallToActionSection } from "../components/CallToActionSection/CallToActionSection";
// import { HeroSection } from "../components/HeroSection/HeroSection.";
// // Importe outros componentes se criar novas seções (TestimonialsSection, etc.)

// export default async function Home() {
//   const session = await auth();

//   if (session) {
//     redirect("/dashboard");
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 text-black">
//       {/* A HeroSection agora tem seus próprios estilos e max-w */}
//       <HeroSection />

//       {/* As seções seguintes podem ter um container interno para max-width */}
//       <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-20">
//         <HowItWorksSection />
//       </div>

//       <FeaturedMusiciansSection /> {/* Pode ter seu próprio container interno se desejar */}

//       <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-20">
//         <CallToActionSection />
//       </div>
//     </main>
//   );
// }



// app/page.tsx
// import { auth } from "@/app/lib/auth";
// import { redirect } from "next/navigation";

// import { TestimonialsSection } from "../components/TestimonialsSection/TestimonialsSection";
// import { CallToActionSection } from "../components/CallToActionSection/CallToActionSection";
// import { HeroSection } from "../components/HeroSection/HeroSection.";
// import { PopularCategoriesSection } from "../components/PopularCategoriesSection;PopularCategoriesSection";

// export default async function Home() {
//   const session = await auth();

//   if (session) {
//     redirect("/dashboard");
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 text-black">
//       {/* Hero Section ocupa toda a largura e define seu próprio padding/min-height */}
//       <HeroSection />

//       {/* As seções seguintes podem ter um container interno para max-width */}
//       <PopularCategoriesSection />

//       {/* Seção de Testemunhos (opcional) */}
//       <TestimonialsSection />

//       <CallToActionSection />
//     </main>
//   );
// }



// app/page.tsx
// Este é um Server Component, otimizado para SEO e performance inicial.
import { auth } from "@/app/lib/auth"; // Para autenticação e redirecionamento
import { redirect } from "next/navigation"; // Para redirecionamento no servidor

// Importe os componentes de seção da sua landing page.
// Certifique-se de que cada um esteja em seu próprio arquivo dentro de `components/`.
import { FeatureCardsSection } from "@/app/components/FeatureCardsSection/FeatureCardsSection";
import { HowItWorksSection } from "@/app/components/HowItWorksSection/HowItWorksSection";
import { FeaturedMusiciansSection } from "@/app/components/FeaturedMusiciansSection/FeaturedMusiciansSection";
import { TestimonialsSection } from "@/app/components/TestimonialsSection/TestimonialsSection";
import { CallToActionSection } from "@/app/components/CallToActionSection/CallToActionSection";
import { HeroSection } from "../components/HeroSection/HeroSection.";

export default async function Home() {
  const session = await auth();

  // Se o usuário estiver autenticado, redireciona para o dashboard.
  // Esta lógica é executada no servidor, antes da renderização.
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* 1. Seção Hero (Pode ter largura total ou gerenciar seu próprio container interno) */}
      {/* Assumimos que HeroSection já possui suas classes de padding e max-width internamente,
          ou que ela se estende por toda a largura e o conteúdo é contido. */}
      <HeroSection />

      {/* 2. Seção de Cartões de Funcionalidades */}
      {/* Estas seções usarão o container padrão para alinhar com Header/Footer */}
      <section className="container mx-auto px-4 py-10 md:px-6 md:py-20">
        <FeatureCardsSection />
      </section>

      {/* 3. Seção "Como Funciona" */}
      <section className="container mx-auto px-4 py-10 md:px-6 md:py-20">
        <HowItWorksSection />
      </section>

      {/* 4. Seção de Músicos em Destaque ou Categorias Populares */}
      {/* Você pode escolher uma ou ambas, dependendo do foco da sua landing page */}
      <section className="container mx-auto px-4 py-10 md:px-6 md:py-20">
        <FeaturedMusiciansSection />
      </section>

      {/* 5. Seção de Categorias Populares (Opcional, se não usar FeaturedMusicians acima) */}
      {/* <section className="container mx-auto px-4 py-10 md:px-6 md:py-20">
        <PopularCategoriesSection />
      </section> */}

      {/* 6. Seção de Testemunhos (Opcional) */}
      <section className="container mx-auto px-4 py-10 md:px-6 md:py-20">
        <TestimonialsSection />
      </section>

      {/* 7. Seção de Chamada para Ação Final */}
      <section className="container mx-auto px-4 py-10 md:px-6 md:py-20">
        <CallToActionSection />
      </section>
    </main>
  );
}