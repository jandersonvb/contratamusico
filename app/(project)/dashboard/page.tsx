"use client";

import { auth } from "@/app/lib/auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function DashboardPage() {
  // const session = await auth(); // Get the session data from the auth function


  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return; // Ainda carregando a sessão
    }

    if (!session) {
      router.push("/auth/login"); // Redirecionar se não estiver autenticado
      return;
    }



    if (!session) {
      redirect("/auth/login");
    }


    // Agora, verificar a role na sessão.
    // Lembre-se: session.user.role deve vir do seu auth.ts e Firestore.
    if (!session.user?.role) {
      console.log("Usuário logado, mas sem role. Redirecionando para seleção de role.");
      // router.push("/onboarding/select-role");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Carregando dashboard...</div>;
  }

  if (!session || !session.user?.role) {
    // Retorna algo enquanto redireciona ou se a role ainda não foi definida
    return null;
  }


  const userId = session?.user?.id; // Extract the user ID or email from the session
  const userEmail = session?.user?.email; // Extract the user email from the session
  console.log("User ID:", userId);
  console.log("User Email:", userEmail);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg">Bem-vindo, {userEmail || "User"}!</p>
          <div className="mt-4">
            <p className="text-gray-500">
              Em breve novas funcionalidades estarão no ar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
