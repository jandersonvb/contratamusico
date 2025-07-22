// app/components/SocialAuthButtons/SocialAuthButtons.tsx
"use client"; // Marca este componente como um Client Component

import { Button } from "@/app/_components/ui/button"; // Ajuste o caminho do seu Button UI component
import { signIn, useSession } from "next-auth/react"; // Importa signIn, useSession e signOut
import Image from "next/image"; // Para exibir o avatar
import { useState } from "react"; // Para gerenciar o estado de loading do botão
import { FaFacebook } from "react-icons/fa"; // Ícone do Facebook
import { FcGoogle } from "react-icons/fc"; // Ícone do Google
import { toast } from "sonner"; // Para exibir notificações de sucesso/erro

export function SocialAuthButtons() {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading dos botões
  const { data: session } = useSession(); // Hook para obter a sessão do usuário

  // Handler para iniciar o processo de autenticação social
  const handleSocialSignIn = async (provider: string, existingAccount = false) => {
    setIsLoading(true); // Ativa o estado de loading ao clicar no botão
    try {
      let result;
      if (existingAccount && session?.user?.email) {
        // Se houver uma sessão e o usuário clicar no botão "Continuar como Jandersson",
        // podemos tentar um signIn com o provedor e o email, embora o NextAuth.js
        // geralmente gerencie isso internamente se a sessão já estiver ativa.
        // Na prática, para "continuar como", o NextAuth.js já consideraria o usuário logado.
        // Este caso é mais para se o botão for para re-autenticar ou confirmar a sessão.
        // Para o comportamento exato da imagem, você simplesmente não precisaria chamar signIn novamente
        // se a sessão já estiver ativa e você quer apenas um "redirecionar".
        // Para fins de demonstração de um "re-signIn" com a mesma conta:
        result = await signIn(provider, {
          redirect: false,
          callbackUrl: "/dashboard",
          login_hint: session.user.email, // Sugere o email para o Google
        });
      } else {
        result = await signIn(provider, {
          redirect: false,
          callbackUrl: "/dashboard",
        });
      }

      // Lida com o resultado da autenticação
      if (result?.error) {
        toast.error(`Erro ao fazer login com ${provider}: ${result.error}`);
        console.error(`Erro de login NextAuth com ${provider}:`, result.error);
      } else if (result?.ok) {
        toast.success(`Login com ${provider} realizado com sucesso! Redirecionando...`);
      }
    } catch (err) {
      console.error(`Erro inesperado durante o login com ${provider}:`, err);
      toast.error(`Ocorreu um erro inesperado com ${provider}. Tente novamente.`);
    } finally {
      setIsLoading(false); // Desativa o estado de loading no final, independentemente do resultado
    }
  };

  return (
    <>
      {session && session.user && session.user.email && session.user.image ? (
        // Renderiza o botão "Continuar como [Nome]" se houver uma sessão ativa
        <Button
          variant="outline"
          className="flex w-full items-center justify-between gap-2 h-12 px-4" // Ajustado para espaçamento
          type="button"
          onClick={() => handleSocialSignIn("google", true)} // Chama o handler com o provedor 'google' e indica que é uma conta existente
          disabled={isLoading}
        >
          <div className="flex items-center gap-3">
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={24} // Tamanho do avatar
              height={24} // Tamanho do avatar
              className="rounded-full"
            />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">Continuar como {session.user.name || "Usuário"}</span>
              <span className="text-xs text-gray-500">{session.user.email}</span>
            </div>
          </div>
          <FcGoogle size={20} /> {/* Ícone do Google */}
          {/* Você pode adicionar um ícone de seta para baixo aqui, por exemplo, de 'react-icons/fi' */}
          {/* <FiChevronDown size={16} className="ml-auto" /> */}
        </Button>
      ) : (
        // Renderiza o botão genérico "Continuar com Google" se não houver sessão ou se você quiser a opção de login inicial
        <Button
          variant="outline"
          className="flex w-full items-center justify-center gap-2 h-12"
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={isLoading}
        >
          <FcGoogle size={20} />
          Continuar com Google
        </Button>
      )}

      {/* Botão "Continuar com Facebook" (permanece o mesmo) */}
      <Button
        variant="outline"
        className="mt-2 flex w-full items-center justify-center gap-2 h-12"
        type="button"
        onClick={() => handleSocialSignIn("facebook")}
        disabled={isLoading}
      >
        <FaFacebook size={20} className="text-blue-600" />
        Continuar com Facebook
      </Button>
    </>
  );
}