// app/components/dashboard/ContractorDashboard.tsx
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Search, Briefcase, Users, Star, PlusCircle, Mail } from "lucide-react"; // Ícones
import { DashboardCard } from "../DashboardCard/DashboardCard";

export function ContractorDashboard() {
  // Mock de dados para o dashboard do contratante
  const proposalsSent = 3;
  const favoriteMusicians = 12;
  const recentBookings = 1;

  return (
    <div className="space-y-8">
      {/* Cards de Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Propostas Enviadas"
          value={proposalsSent}
          description="Em negociação ou finalizadas"
          icon={<Briefcase className="text-muted-foreground h-4 w-4" />}
        />
        <DashboardCard
          title="Músicos Favoritos"
          value={favoriteMusicians}
          description="Seu catálogo de talentos"
          icon={<Users className="text-muted-foreground h-4 w-4" />}
        />
        <DashboardCard
          title="Eventos Agendados"
          value={recentBookings}
          description="Próximo show em 2 semanas"
          icon={<Star className="text-muted-foreground fill-primary h-4 w-4" />}
        />
        <DashboardCard
          title="Novos Músicos"
          value="+15"
          description="Nesta semana"
          icon={<PlusCircle className="text-muted-foreground h-4 w-4" />}
        />
      </div>

      {/* Seções de Ações Rápidas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="#">
              <Button
                variant="default"
                className="flex h-auto w-full flex-col items-center justify-center space-y-1 py-4"
              >
                <Search className="mb-2 h-6 w-6" />
                <span className="font-semibold">Buscar Músicos</span>
                <span className="text-muted-foreground text-xs">
                  Encontre o talento ideal agora
                </span>
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="outline"
                className="flex h-auto w-full flex-col items-center justify-center space-y-1 py-4"
              >
                <Briefcase className="mb-2 h-6 w-6" />
                <span className="font-semibold">Minhas Contratações</span>
                <span className="text-muted-foreground text-xs">
                  Acompanhe suas negociações
                </span>
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="outline"
                className="flex h-auto w-full flex-col items-center justify-center space-y-1 py-4"
              >
                <Users className="mb-2 h-6 w-6" />
                <span className="font-semibold">Meus Favoritos</span>
                <span className="text-muted-foreground text-xs">
                  Acesse rapidamente seus talentos preferidos
                </span>
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                variant="outline"
                className="flex h-auto w-full flex-col items-center justify-center space-y-1 py-4"
              >
                <Mail className="mb-2 h-6 w-6" />
                <span className="font-semibold">Suporte</span>
                <span className="text-muted-foreground text-xs">
                  Fale com nossa equipe
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Atividade Recente (Exemplo) */}
        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold">
            Últimas Atividades
          </h2>
          <DashboardCard className="p-4" title={""}>
            <p className="text-muted-foreground mb-2 text-sm">
              <span className="text-foreground font-medium">
                Banda Rock Express
              </span>{" "}
              respondeu à sua proposta para o evento em 05/07.
            </p>
            <Link href="/dashboard/contractor/my-proposals/456">
              <Button variant="link" className="h-auto p-0">
                Ver Proposta
              </Button>
            </Link>
            <p className="text-muted-foreground mt-4 text-sm">
              Novo músico{" "}
              <span className="text-foreground font-medium">
                Voz e Violão Harmonia
              </span>{" "}
              adicionado na sua cidade.
            </p>
            <Link href="/musicos?new=true">
              <Button variant="link" className="h-auto p-0">
                Explorar
              </Button>
            </Link>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
