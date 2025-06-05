// app/(main)/dashboard/page.tsx
// Server Component para o Dashboard principal.

import { auth } from "@/app/lib/auth"; // Para obter a sessão
import { redirect } from "next/navigation"; // Para redirecionamento
import { db } from "@/app/lib/firebase"; // Para buscar a role do usuário no Firestore, se necessário
import { MusicianDashboard } from "@/app/components/MusicianDashboard/MusicianDashboard";
import { ContractorDashboard } from "@/app/components/ContractorDashboard/ContractorDashboard";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

export default async function DashboardPage() {
  const session = await auth();

  // Se o usuário NÃO estiver autenticado, redireciona para a página de login
  if (!session) {
    redirect("/login");
  }

  // Busca a role do usuário a partir da sessão e/ou Firestore (se não estiver no token)
  let userRole: "musician" | "contractor" | "admin" | null =
    session.user?.role || null;

  // Se a role não veio na sessão, tenta buscar no Firestore.
  // IMPORTANTE: Idealmente, a role viria no JWT do NextAuth para evitar essa chamada.
  if (!userRole && session.user?.id) {
    try {
      const userRef = db.collection("users").doc(session.user.id);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        userRole =
          (userData?.role as "musician" | "contractor" | "admin") || null;
      }
    } catch (error) {
      console.error(
        "Erro ao buscar role do usuário no Firestore no DashboardPage:",
        error,
      );
      // userRole permanecerá null ou o valor padrão da sessão
    }
  }

  // Opcional: Redirecionar para onboarding se o usuário não tiver uma role definida
  // Isso é mais seguro fazer aqui do que no layout.tsx
  if (!userRole) {
    console.log(
      "Usuário logado sem role, redirecionando para seleção de role/onboarding...",
    );
    redirect("/onboarding/select-role"); // Exemplo de rota de onboarding
  }

  return (
    <div className="bg-background text-foreground container mx-auto min-h-[calc(100vh-var(--header-height)-var(--footer-height))] px-4 py-8 md:py-12">
      {" "}
      {/* Ajuste o min-height conforme a altura do seu Header/Footer */}
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">
        Bem-vindo, {session.user?.name?.split(" ")[0] || "Usuário"}!
      </h1>
      {userRole === "musician" && <MusicianDashboard />}
      {userRole === "contractor" && <ContractorDashboard />}
      {userRole === "admin" && (
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">
            Dashboard de Administrador
          </h2>
          <p className="text-muted-foreground">
            Conteúdo exclusivo para administradores.
          </p>
          {/* Adicione links e ferramentas de administração aqui */}
        </div>
      )}
      {/* Fallback caso a role não seja reconhecida */}
      {!userRole ||
        (userRole !== "musician" &&
          userRole !== "contractor" &&
          userRole !== "admin" && (
            <div className="bg-card rounded-lg p-6 text-center shadow-md">
              <p className="text-muted-foreground">
                Seu tipo de conta não foi identificado. Por favor, entre em
                contato com o suporte.
              </p>
              <Link href="/contato" className="mt-4 inline-block">
                <Button>Falar com Suporte</Button>
              </Link>
            </div>
          ))}
    </div>
  );
}
