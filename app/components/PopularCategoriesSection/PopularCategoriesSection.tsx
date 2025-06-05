// components/PopularCategoriesSection/PopularCategoriesSection.tsx
import Link from "next/link";
import { Guitar, Piano, Mic, Drum, Music, Music2 } from "lucide-react"; // Exemplos de ícones
import { Button } from "@/app/_components/ui/button";

interface CategoryCardProps {
  icon: React.ElementType;
  title: string;
  href: string;
}

function CategoryCard({ icon: Icon, title, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <Icon className="mb-4 h-12 w-12 text-pink-600" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
    </Link>
  );
}

export function PopularCategoriesSection() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="mb-12 text-3xl font-bold text-gray-800 md:text-4xl">
          Encontre Músicos por Estilo
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          <CategoryCard
            icon={Guitar}
            title="Rock & Pop"
            href="/musicos?category=rock-pop"
          />
          <CategoryCard
            icon={Mic}
            title="Voz e Violão"
            href="/musicos?category=voz-violao"
          />
          <CategoryCard
            icon={Piano}
            title="Clássico"
            href="/musicos?category=classico"
          />
          <CategoryCard
            icon={Drum}
            title="Jazz & Blues"
            href="/musicos?category=jazz-blues"
          />
          <CategoryCard
            icon={Music}
            title="Sertanejo"
            href="/musicos?category=sertanejo"
          />
          <CategoryCard
            icon={Music2}
            title="MPB"
            href="/musicos?category=mpb"
          />
        </div>
        <div className="mt-12">
          <Link href="/musicos">
            <Button
              variant="outline"
              className="border-gray-400 text-gray-800 hover:bg-gray-200"
            >
              Ver Todas as Categorias
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
