// components/HowItWorksSection/HowItWorksSection.tsx
import { Music, Search, Handshake, Star } from "lucide-react"; // Importar novos ícones se necessário

interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function StepCard({ icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <Icon className="mb-4 h-10 w-10 text-red-500" />
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="mb-12 text-3xl font-bold text-gray-800 md:text-4xl">
          Como funciona? É simples!
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <StepCard
            icon={Search}
            title="Encontre seu Músico"
            description="Use nossa busca inteligente para filtrar por estilo, localização e mais."
          />
          <StepCard
            icon={Music}
            title="Explore Perfis"
            description="Visualize portfólios, vídeos e avaliações de músicos talentosos."
          />
          <StepCard
            icon={Handshake}
            title="Contrate Facilmente"
            description="Entre em contato direto e feche o melhor negócio para seu evento."
          />
          <StepCard
            icon={Star}
            title="Avalie e Compartilhe"
            description="Deixe sua avaliação e ajude outros a encontrar os melhores talentos."
          />
        </div>
      </div>
    </section>
  );
}