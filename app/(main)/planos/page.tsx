// import { Button } from "@/app/_components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/app/_components/ui/card";
// import { Check } from "lucide-react";

// const plans = [
//   {
//     name: "Gratuito",
//     price: "R$ 0",
//     period: "",
//     description: "Comece a divulgar seu trabalho e receber propostas.",
//     features: [
//       "Perfil Básico (Descrição, Estilo, Localização)",
//       "Upload Limitado de Mídia (Fotos/Vídeos)",
//       "Visibilidade Padrão na Busca",
//       "Recebimento de Propostas",
//       "Agenda Básica",
//     ],
//     cta: "Começar Agora",
//     variant: "outline" as const,
//   },
//   {
//     name: "Premium",
//     price: "R$ 29,90",
//     period: "/mês",
//     description: "Maximize sua visibilidade e profissionalize sua presença.",
//     features: [
//       "Todos os recursos do Gratuito",
//       "Perfil Aprimorado (Mais Mídia, Links Sociais)",
//       "Maior Visibilidade (Destaque na Busca)",
//       "Selo de Músico Verificado/Premium",
//       "Analytics de Perfil",
//       "Ferramentas de Gestão (Agenda Avançada, Orçamentos)",
//       // "Comunicação Direta (em breve)",
//     ],
//     cta: "Assinar Premium",
//     variant: "default" as const,
//   },
//   // Add Annual plan later if needed
// ];

// export default function PricingPage() {
//   return (
//     <div className="min-h-screen w-full bg-gray-100 px-4 py-12 text-black">
//       <div className="mb-12 text-center">
//         <h1 className="mb-4 text-4xl font-bold text-black">
//           Planos para Músicos
//         </h1>
//         <p className="mx-auto max-w-2xl text-xl text-gray-600">
//           Escolha o plano ideal para impulsionar sua carreira musical na
//           ContrataMusico.
//         </p>
//       </div>

//       <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
//         {plans.map((plan) => (
//           <Card
//             key={plan.name}
//             className={`flex flex-col ${plan.name === "Premium" ? "border-primary" : ""} bg-white`}
//           >
//             <CardHeader>
//               <CardTitle className="text-2xl text-black">{plan.name}</CardTitle>
//               <CardDescription>{plan.description}</CardDescription>
//               <div className="pt-4">
//                 <span className="text-3xl font-bold text-red-500">
//                   {plan.price}
//                 </span>
//                 <span className="text-gray-500">{plan.period}</span>
//               </div>
//             </CardHeader>
//             <CardContent className="flex-1">
//               <ul className="space-y-3">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-start">
//                     <Check className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
//                     <span className="text-sm text-gray-600">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full" variant={plan.variant}>
//                 {plan.cta}
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-12 text-center text-sm text-gray-500">
//         <p>
//           Para contratantes, o uso da plataforma é gratuito. Uma taxa de serviço
//           será aplicada sobre contratações confirmadas.
//         </p>
//       </div>
//     </div>
//   );
// }

// app/(main)/planos/page.tsx
// Server Component

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import Link from "next/link";
import { Check, Crown, Zap } from "lucide-react"; // Ícones

export default function PlanosPage() {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Comece sua jornada musical sem custo.",
      features: [
        "Criação de perfil básico",
        "Até 3 fotos no portfólio",
        "Pesquisa ilimitada de talentos (para contratantes)",
        "Até 5 propostas/mês (para músicos)",
        "Suporte por e-mail básico",
      ],
      buttonText: "Começar Grátis",
      buttonVariant: "secondary" as const,
      isPopular: false,
    },
    {
      name: "Premium",
      price: "R$ 49,90",
      period: "/mês",
      description: "Desbloqueie todo o potencial da sua presença musical.",
      features: [
        "Todas as funcionalidades do Gratuito",
        "Perfis verificados e destaque no site",
        "Portfólio ilimitado (fotos, vídeos, áudios)",
        "Propostas ilimitadas (para músicos)",
        "Acesso a oportunidades exclusivas",
        "Suporte prioritário por chat",
        "Estatísticas de perfil avançadas",
      ],
      buttonText: "Assinar Premium",
      buttonVariant: "default" as const,
      isPopular: true,
    },
    {
      name: "Profissional",
      price: "R$ 99,90",
      period: "/mês",
      description: "Para quem leva a música a sério, máxima visibilidade.",
      features: [
        "Todas as funcionalidades do Premium",
        "Destaque premium em pesquisas",
        "Convites para eventos selecionados",
        "Sessões de consultoria de carreira",
        "Acesso a workshops e masterclasses",
        "Suporte 24/7 dedicado",
      ],
      buttonText: "Assinar Profissional",
      buttonVariant: "outline" as const, // Exemplo de outra variante
      isPopular: false,
    },
  ];

  const faqs = [
    {
      question: "Posso cancelar meu plano a qualquer momento?",
      answer:
        "Sim, você pode cancelar sua assinatura a qualquer momento, sem taxas adicionais. O cancelamento entrará em vigor no final do seu ciclo de faturamento atual.",
    },
    {
      question: "Os planos são diferentes para músicos e contratantes?",
      answer:
        "Atualmente, nossos planos oferecem benefícios que atendem a ambos os perfis, com foco em visibilidade para músicos e acesso a talentos para contratantes. Novas funcionalidades específicas para cada público podem ser adicionadas no futuro.",
    },
    {
      question: "Existe um período de teste para os planos pagos?",
      answer:
        "Não oferecemos um período de teste gratuito para os planos pagos, mas você pode começar com o plano Gratuito para experimentar a plataforma antes de decidir por uma assinatura.",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "O pagamento é feito mensalmente e de forma recorrente, utilizando seu cartão de crédito. As transações são seguras e processadas por nosso parceiro de pagamento.",
    },
  ];

  return (
    <div className="bg-background text-foreground flex flex-col items-center py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">
          Escolha o Plano Perfeito Para Você
        </h1>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg">
          Seja você um músico buscando oportunidades ou um contratante em busca
          de talentos, temos um plano ideal para suas necessidades.
        </p>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col items-center border-2 p-6 text-center shadow-lg transition-transform duration-300 hover:scale-[1.02] ${plan.isPopular ? "border-primary" : "border-border"}`}
            >
              {plan.isPopular && (
                <div className="bg-primary text-primary-foreground absolute -top-3 right-0 rounded-tr-lg rounded-bl-lg px-3 py-1 text-xs font-bold">
                  <Crown className="mr-1 inline-block h-3 w-3" /> Mais Popular
                </div>
              )}
              <CardHeader className="mb-4 p-0">
                <CardTitle className="mb-2 text-3xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow p-0">
                <p className="text-foreground mb-6 text-5xl font-extrabold">
                  {plan.price}
                  <span className="text-muted-foreground text-lg font-medium">
                    {plan.period}
                  </span>
                </p>
                <ul className="text-muted-foreground mb-8 space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex w-full justify-center p-0">
                <Link href="/cadastro">
                  {" "}
                  {/* Rota genérica de cadastro/assinatura */}
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.buttonText} <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <h2 className="mb-8 text-3xl font-bold md:text-4xl">
          Perguntas Frequentes
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-3xl text-left"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-foreground text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
