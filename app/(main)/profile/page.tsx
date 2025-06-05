import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import Link from "next/link";

// Mock data - replace with actual user data fetching later
const musicianDashboardData = {
  name: "Artista Exemplo",
  currentPlan: "Premium", // Could be "Gratuito" or "Premium"
  upcomingEvents: 3,
  pendingProposals: 2,
  profileViews: 150, // Example analytic
};

export default function MusicianDashboardPage() {
  const { name, currentPlan, upcomingEvents, pendingProposals, profileViews } =
    musicianDashboardData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Painel do Músico - {name}</h1>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Subscription Card */}
        <Card>
          <CardHeader>
            <CardTitle>Minha Assinatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Plano Atual:</span>
              <Badge
                variant={currentPlan === "Premium" ? "default" : "secondary"}
              >
                {currentPlan}
              </Badge>
            </div>
            {/* Add details like next billing date if applicable */}
          </CardContent>
          <CardFooter>
            <Link href="/pricing" passHref className="w-full">
              <Button variant="outline" className="w-full">
                Ver Planos / Gerenciar
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Quick Stats Cards (Placeholders) */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{upcomingEvents}</p>
            <p className="text-muted-foreground text-xs">Eventos confirmados</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Ver Agenda
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Propostas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingProposals}</p>
            <p className="text-muted-foreground text-xs">
              Aguardando sua resposta
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Ver Propostas
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Other Sections (Manage Profile, Analytics, etc. - Placeholders) */}
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Perfil</CardTitle>
            <CardDescription>
              Mantenha suas informações, fotos, vídeos e áudios atualizados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder content or link */}
            <p className="text-muted-foreground mb-4 text-sm">
              Visualizações do perfil (últimos 30 dias): {profileViews}
            </p>
            <Link href={`/musicians/2`} passHref>
              {" "}
              {/* Replace "123" with actual ID */}
              <Button variant="default">Editar Meu Perfil</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Add more sections like Analytics details, Proposals History, etc. */}
      </div>
    </div>
  );
}
