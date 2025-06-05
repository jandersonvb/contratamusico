// app/components/landing/KeyFeaturesSection.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { CheckCircle, Palette, Calendar, Star } from "lucide-react"; // Ícones

export function KeyFeaturesSection() {
  const features = [
    {
      icon: <CheckCircle className="text-primary mb-4 h-10 w-10" />,
      title: "Perfis Verificados",
      description:
        "Garantimos a autenticidade dos talentos e das propostas para sua segurança.",
    },
    {
      icon: <Palette className="text-primary mb-4 h-10 w-10" />,
      title: "Variedade de Estilos",
      description:
        "Do clássico ao contemporâneo, encontre músicos de todos os gêneros e instrumentos.",
    },
    {
      icon: <Calendar className="text-primary mb-4 h-10 w-10" />,
      title: "Agendamento Simplificado",
      description:
        "Ferramentas intuitivas para gerenciar datas, horários e detalhes do evento.",
    },
    {
      icon: <Star className="text-primary mb-4 h-10 w-10" />,
      title: "Avaliações e Feedback",
      description:
        "Construa sua reputação ou escolha com base na experiência de outros usuários.",
    },
  ];

  return (
    <section className="bg-muted/20 rounded-lg p-8 text-center">
      <h2 className="text-foreground mb-12 text-3xl font-bold md:text-4xl">
        Por Que Escolher ContrataMusico?
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-card text-card-foreground p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <CardHeader className="mb-4 p-0">
              {feature.icon}
              <CardTitle className="text-xl font-semibold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground p-0 text-sm">
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
