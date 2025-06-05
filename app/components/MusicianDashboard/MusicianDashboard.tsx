// app/components/dashboard/MusicianDashboard.tsx
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Star,
  LineChart,
  Bell,
  Music,
} from "lucide-react"; // Ícones
import { DashboardCard } from "../DashboardCard/DashboardCard";

export function MusicianDashboard() {
  // Mock de dados para o dashboard do músico
  const proposalsCount = 7;
  const nextGig = "Show no Bar da Praça - 20/06/2025";
  const profileViews = 125;
  const rating = 4.8;

  return (
    <div className="space-y-8">
      {/* Cards de Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Propostas Recebidas"
          value={proposalsCount}
          description="Última em 2 dias atrás"
          icon={<Briefcase className="text-muted-foreground h-4 w-4" />}
        />
        <DashboardCard
          title="Próximo Agendamento"
          value={nextGig.split(" - ")[0]}
          description={nextGig.split(" - ")[1]}
          icon={<Calendar className="text-muted-foreground h-4 w-4" />}
        />
        <DashboardCard
          title="Visualizações de Perfil"
          value={profileViews}
          description="+18% desde a semana passada"
          icon={<LineChart className="text-muted-foreground h-4 w-4" />}
        />
        <DashboardCard
          title="Sua Avaliação"
          value={rating.toFixed(1)}
          description="Média das avaliações"
          icon={
            <Star className="text-muted-foreground h-4 w-4 fill-yellow-500" />
          }
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
                variant="outline"
                className="flex h-auto w-full flex-col items-center justify-center space-y-1 py-4"
              >
                <Music className="mb-2 h-6 w-6" />
                <span className="font-semibold">Editar Meu Perfil</span>
                <span className="text-muted-foreground text-xs">
                  Mantenha seu portfólio atualizado
                </span>
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="outline"
                className="flex h-auto w-full flex-col items-center justify-center space-y-1 py-4"
              >
                <Briefcase className="mb-2 h-6 w-6" />
                <span className="font-semibold">Minhas Propostas</span>
                <span className="text-muted-foreground text-xs">
                  Veja as oportunidades de trabalho
                </span>
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="outline"
                className="flex h-auto w-full flex-col items-center justify-center space-y-1 py-4"
              >
                <Calendar className="mb-2 h-6 w-6" />
                <span className="font-semibold">Meus Agendamentos</span>
                <span className="text-muted-foreground text-xs">
                  Gerencie seus shows e eventos
                </span>
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="outline"
                className="flex h-auto w-full flex-col items-center justify-center space-y-1 py-4"
              >
                <Bell className="mb-2 h-6 w-6" />
                <span className="font-semibold">Notificações</span>
                <span className="text-muted-foreground text-xs">
                  Mantenha-se atualizado
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Atividade Recente (Exemplo) */}
        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold">
            Atividade Recente
          </h2>
          <DashboardCard className="p-4" title={""}>
            <p className="text-muted-foreground mb-2 text-sm">
              <span className="text-foreground font-medium">Mariana Silva</span>{" "}
              enviou uma nova proposta para o show em 20/06.
            </p>
            <Link href="#">
              <Button variant="link" className="h-auto p-0">
                Ver Detalhes
              </Button>
            </Link>
            {/* Mais itens de atividade */}
            <p className="text-muted-foreground mt-4 text-sm">
              Seu perfil foi visualizado 5 vezes hoje.
            </p>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
