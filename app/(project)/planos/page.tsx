import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "",
    description: "Comece a divulgar seu trabalho e receber propostas.",
    features: [
      "Perfil Básico (Descrição, Estilo, Localização)",
      "Upload Limitado de Mídia (Fotos/Vídeos)",
      "Visibilidade Padrão na Busca",
      "Recebimento de Propostas",
      "Agenda Básica",
    ],
    cta: "Começar Agora",
    variant: "outline" as const,
  },
  {
    name: "Premium",
    price: "R$ 29,90",
    period: "/mês",
    description: "Maximize sua visibilidade e profissionalize sua presença.",
    features: [
      "Todos os recursos do Gratuito",
      "Perfil Aprimorado (Mais Mídia, Links Sociais)",
      "Maior Visibilidade (Destaque na Busca)",
      "Selo de Músico Verificado/Premium",
      "Analytics de Perfil",
      "Ferramentas de Gestão (Agenda Avançada, Orçamentos)",
      // "Comunicação Direta (em breve)",
    ],
    cta: "Assinar Premium",
    variant: "default" as const,
  },
  // Add Annual plan later if needed
];

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-12 text-black">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-black">
          Planos para Músicos
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Escolha o plano ideal para impulsionar sua carreira musical na
          ContrataMusico.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${plan.name === "Premium" ? "border-primary" : ""} bg-white`}
          >
            <CardHeader>
              <CardTitle className="text-2xl text-black">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold text-red-500">
                  {plan.price}
                </span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.variant}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          Para contratantes, o uso da plataforma é gratuito. Uma taxa de serviço
          será aplicada sobre contratações confirmadas.
        </p>
      </div>
    </div>
  );
}
