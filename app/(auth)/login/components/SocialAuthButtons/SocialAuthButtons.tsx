"use client";

import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { toast } from "sonner";

export function SocialAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<null | string>(null);

  const handleSocialLogin = async (provider: string) => {
    setLoadingProvider(provider);

    const result = await signIn(provider, {
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      toast.error(`Erro ao logar com ${provider}: ${result.error}`);
    } else if (result?.url) {
      toast.success("Login bem-sucedido!");
      window.location.href = result.url;
    }

    setLoadingProvider(null);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => handleSocialLogin("google")}
        disabled={loadingProvider === "google"}
      >
        <FcGoogle size={20} />
        {loadingProvider === "google" ? "Entrando..." : "Continuar com Google"}
      </Button>

      <Button
        variant="outline"
        className="mt-2 w-full flex items-center justify-center gap-2"
        onClick={() => handleSocialLogin("facebook")}
        disabled={loadingProvider === "facebook"}
      >
        <FaFacebook size={20} className="text-blue-600" />
        {loadingProvider === "facebook" ? "Entrando..." : "Continuar com Facebook"}
      </Button>
    </>
  );
}
