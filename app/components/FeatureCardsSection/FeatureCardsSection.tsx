// components/FeatureCardsSection/FeatureCardsSection.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/app/_components/ui/card";
import { UserPlus, Search, CheckCircle } from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Componente interno para cada cartão de funcionalidade
function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-white text-center text-black shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <Icon className="mx-auto mb-4 h-10 w-10 text-primary md:h-12 md:w-12" />
        <CardTitle className="mb-2 text-xl font-bold md:text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 md:text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export function FeatureCardsSection() {
  return (
    <section className=" mt-20 grid grid-cols-1 gap-6 text-center md:mb-20 md:grid-cols-3 md:gap-10">
      <FeatureCard
        icon={UserPlus}
        title="Cadastro rápido"
        description="Crie seu perfil em minutos e comece a ser encontrado."
      />
      <FeatureCard
        icon={Search}
        title="Busca inteligente"
        description="Filtre músicos por localização, estilo e disponibilidade."
      />
      <FeatureCard
        icon={CheckCircle}
        title="Perfil verificado"
        description="Perfis verificados garantem que você está lidando com músicos reais e confiáveis."
      />
    </section>
  );
}