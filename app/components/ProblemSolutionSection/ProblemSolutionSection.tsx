// app/components/landing/ProblemSolutionSection.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Users, Handshake, Search, PlayCircle, Check } from "lucide-react"; // Ícones

export function ProblemSolutionSection() {
  return (
    <section className="text-center">
      <h2 className="text-foreground mb-12 text-3xl font-bold md:text-4xl">
        Para Quem Somos? Sua Solução Musical Está Aqui.
      </h2>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Para Contratantes */}
        <Card className="border-accent hover:border-primary/80 bg-card text-card-foreground border-t-4 p-8 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader className="mb-6 p-0">
            <Users className="text-primary mx-auto mb-4 h-12 w-12" />
            <CardTitle className="text-2xl font-bold">
              Para Contratantes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4 p-0 text-left">
            <p>
              Cansado de procurar músicos de qualidade em diversos lugares? Quer
              praticidade e segurança na hora de escolher o talento ideal?
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-start">
                <Check className="text-primary mr-2 h-5 w-5" />
                Acesso a um vasto catálogo de músicos verificados.
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 h-5 w-5" />
                Filtros avançados para encontrar o estilo e disponibilidade
                desejados.
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 h-5 w-5" />
                Agendamento e comunicação simplificados.
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 h-5 w-5" />
                Avaliações e portfólios completos para sua segurança.
              </li>
            </ul>
            <Link href="/signup" className="mt-4 inline-block">
              <Button variant="default">
                <Search className="mr-2 h-4 w-4" /> Encontre seu Músico
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Para Músicos */}
        <Card className="border-accent hover:border-primary/80 bg-card text-card-foreground border-t-4 p-8 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardHeader className="mb-6 p-0">
            <Handshake className="text-primary mx-auto mb-4 h-12 w-12" />
            <CardTitle className="text-2xl font-bold">Para Músicos</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4 p-0 text-left">
            <p>
              Busca mais oportunidades de trabalho? Quer expandir seu público e
              sua rede de contatos?
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-start">
                <Check className="text-primary mr-2 h-5 w-5" />
                Crie um perfil profissional completo e destaque seu portfólio.
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 h-5 w-5" />
                Seja encontrado por contratantes em todo o Brasil.
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 h-5 w-5" />
                Gerencie seus agendamentos de forma organizada.
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-2 h-5 w-5" />
                Aumente sua visibilidade e oportunidades de performance.
              </li>
            </ul>
            <Link href="/signup" className="mt-4 inline-block">
              <Button variant="default">
                <PlayCircle className="mr-2 h-4 w-4" /> Destaque seu Talento
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
