// app/components/forms/ForgotPasswordForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import Link from "next/link";
import { toast } from "sonner"; // Para feedback ao usuário

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null); // Limpa o erro ao digitar
    setSuccessMessage(null); // Limpa a mensagem de sucesso ao digitar
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError("E-mail é obrigatório.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("E-mail inválido.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setError(null);

    if (!validateEmail()) {
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de chamada de API para enviar o e-mail de redefinição
      // Em uma aplicação real, você faria uma requisição para sua API
      // Ex: await fetch('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ email }) });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(`Link de redefinição enviado para: ${email}`);
      setSuccessMessage(
        "Se um e-mail correspondente foi encontrado, um link de redefinição foi enviado.",
      );
      toast.success("Link de redefinição enviado! Verifique seu e-mail.");
      setEmail(""); // Limpa o campo após o envio
    } catch (err) {
      console.error("Erro ao solicitar redefinição de senha:", err);
      setError("Ocorreu um erro ao tentar enviar o e-mail. Tente novamente.");
      toast.error("Erro ao enviar e-mail. Tente novamente.");
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
          onChange={handleChange}
          disabled={isLoading}
          className={error ? "border-destructive" : ""}
        />
        {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
        {successMessage && (
          <p className="mt-1 text-sm text-emerald-600">{successMessage}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Enviando Link..." : "Enviar Link de Redefinição"}
      </Button>

      <div className="text-muted-foreground text-center text-sm">
        Lembrou da sua senha?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary/90 underline"
        >
          Faça Login
        </Link>
      </div>
      <div className="text-muted-foreground text-center text-sm">
        Não tem uma conta?{" "}
        <Link
          href="/signup"
          className="text-primary hover:text-primary/90 underline"
        >
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
