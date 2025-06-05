// app/dashboard/musician/profile/create/page.tsx
import { MusicianProfileForm } from "@/app/components/MusicianProfileForm/MusicianProfileForm";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function CreateMusicianProfilePage() {
  const session = await auth();

  // Redireciona o usuário para o login se não estiver autenticado
  if (!session) {
    redirect("/auth/login");
  }

  // Opcional: Se você quiser garantir que apenas músicos criem perfil aqui
  if (session.user?.role !== "musician") {
    // Você pode redirecionar para uma página de erro ou dashboard genérico
    redirect("/dashboard");
  }

  // TODO: Em um cenário real, aqui você poderia buscar dados iniciais do perfil do músico
  // se ele já existir parcialmente (ex: para preencher o formulário em caso de edição).
  // const musicianProfileData = await getMusicianProfile(session.user.id);

  return (
    <div className="bg-background flex min-h-screen items-start justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-card border-border w-full max-w-4xl space-y-8 rounded-lg border p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-foreground mt-6 text-3xl font-extrabold">
            Crie seu Perfil de Músico
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            Compartilhe seus talentos e informações para ser encontrado por
            contratantes.
          </p>
        </div>
        {/* Passa dados iniciais se houver, ou um objeto vazio para criação */}
        <MusicianProfileForm initialData={null} />
      </div>
    </div>
  );
}
