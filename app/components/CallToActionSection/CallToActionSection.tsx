// components/CallToActionSection/CallToActionSection.tsx
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

export function CallToActionSection() {
  return (
    <section className="py-16 text-center bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
          Pronto para Sua Próxima Experiência Musical?
        </h2>
        <p className="mb-10 text-lg text-gray-600 md:text-xl">
          Seja encontrando o talento perfeito para seu evento ou levando sua música para o mundo.
        </p>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Link href="/musicos">
            <Button variant="default" className="px-8 py-3 text-lg bg-pink-600 hover:bg-pink-700">
              Encontrar Músicos
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline" className="px-8 py-3 text-lg border-purple-600 text-purple-600 hover:bg-purple-50">
              Cadastrar Minha Arte
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}