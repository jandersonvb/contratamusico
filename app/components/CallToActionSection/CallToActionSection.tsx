// // components/CallToActionSection/CallToActionSection.tsx
// import Link from "next/link";
// import { Button } from "@/app/_components/ui/button";

// export function CallToActionSection() {
//   return (
//     <section className="py-16 text-center bg-white">
//       <div className="mx-auto max-w-4xl px-4">
//         <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
//           Pronto para Sua Próxima Experiência Musical?
//         </h2>
//         <p className="mb-10 text-lg text-gray-600 md:text-xl">
//           Seja encontrando o talento perfeito para seu evento ou levando sua música para o mundo.
//         </p>
//         <div className="flex flex-col justify-center gap-4 md:flex-row">
//           <Link href="/musicos">
//             <Button variant="default" className="px-8 py-3 text-lg bg-pink-600 hover:bg-pink-700">
//               Encontrar Músicos
//             </Button>
//           </Link>
//           <Link href="/auth/signup">
//             <Button variant="outline" className="px-8 py-3 text-lg border-purple-600 text-purple-600 hover:bg-purple-50">
//               Cadastrar Minha Arte
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// app/components/landing/CallToActionSection.tsx
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Search, UserCheck2Icon } from "lucide-react"; // Ícones
import Link from "next/link";

export function CallToActionSection() {
  return (
    <section className="text-center">
      <Card className="bg-card text-card-foreground overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Pronto para Conectar Talentos?
        </h2>
        <p className="mb-8 text-lg opacity-90 md:text-xl">
          Junte-se à comunidade ContrataMusico hoje mesmo!
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/signup">
            <Button size="lg" variant="default">
              <UserCheck2Icon className="mr-2 h-5 w-5" /> Cadastre-se Grátis
            </Button>
          </Link>
          <Link href="#">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary border-2 hover:text-white"
            >
              <Search className="mr-2 h-5 w-5" /> Explore Músicos
            </Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}
