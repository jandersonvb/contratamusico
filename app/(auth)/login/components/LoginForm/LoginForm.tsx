// app/components/forms/LoginForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    setError(null);

    if (!email || !password) {
      toast.error("E-mail e senha são obrigatórios.");
      setError(null); // Remove a mensagem de erro abaixo dos inputs
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        toast.error(`Erro ao fazer login: ${result.error}`);
      } else if (result?.ok) {
        toast.success("Login realizado com sucesso! Redirecionando...");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Erro inesperado durante o login:", err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email" className="mb-2">
          E-mail
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          disabled={isLoading}
          className={error && email === "" ? "border-destructive" : ""}
        />
      </div>

      <div>
        <Label htmlFor="password" className="mb-2">
          Senha
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          disabled={isLoading}
          className={error && password === "" ? "border-destructive" : ""}
        />
        <Link
          href="/forgot-password"
          className="text-primary mt-2 block text-right text-sm hover:underline"
        >
          Esqueceu a senha?
        </Link>
      </div>

      {error && <p className="text-destructive text-center text-sm">{error}</p>}

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      <div className="text-muted-foreground text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
