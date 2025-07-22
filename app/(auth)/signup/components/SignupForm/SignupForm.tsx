// app/components/forms/SignupForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import Link from "next/link";
import { toast } from "sonner"; // Para feedback ao usuário
import { useRouter } from "next/navigation"; // Para redirecionamento
import { signIn } from "next-auth/react";
import type { AccountType } from "@/app/lib/types/common/common";



export function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "contratante" as AccountType, // Define o tipo de conta padrão
  });

  // Estado para controle de loading e erros
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));

    // Limpa o erro ao digitar
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleAccountTypeChange = (value: string) => {
    // Validação básica para garantir que o valor é um tipo de conta válido
    if (value === "musico" || value === "contratante") {
      setFormData((prev) => ({ ...prev, accountType: value as AccountType }));
    } else {
      // Opcional: Lidar com um valor inválido, embora o RadioGroup já restrinja
      toast.error("Tipo de conta inválido selecionado.");
    }

    if (errors.accountType) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.accountType;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Nome completo é obrigatório.";

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido.";
    }
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória.";
    } else if (formData.password.length < 8) {
      // Já estamos validando 6 no backend
      newErrors.password = "A senha deve ter no mínimo 8 caracteres.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }
    if (!formData.accountType)
      // Já tem um valor padrão, mas bom ter a validação
      newErrors.accountType = "Selecione um tipo de conta.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário.");
      setIsLoading(false);
      return;
    }

    try {
      // Ajustado: Use process.env.NEXT_PUBLIC_API_BACKEND_URL
      const backendUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;


      // 1. Chama o endpoint de cadastro do seu backend NestJS
      const res = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          accountType: formData.accountType,
        }),
      });

      // Se a resposta do backend NÃO for OK (status 4xx ou 5xx), tenta ler o JSON de erro
      if (!res.ok) {
        // Tenta ler o corpo da resposta como JSON, mesmo em caso de erro
        const errorData = await res.json();
        const errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(", ")
          : errorData.message || errorData.error || "Erro desconhecido ao criar conta.";
        throw new Error(errorMessage); // Lança o erro para o bloco catch
      }

      // *** SUCESSO NO CADASTRO NO BACKEND ***
      // 2. Agora, faça o login usando NextAuth.js CredentialProvider
      // Isso estabelece a sessão no navegador (cookies seguros).
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, // Não redireciona automaticamente; tratamos o redirecionamento aqui
      });

      // Lida com o resultado do login do NextAuth.js
      if (result?.error) {
        toast.error(`Erro ao fazer login após cadastro: ${result.error}`);
        console.error("Erro de login NextAuth após cadastro:", result.error);
        // Opcional: Aqui você pode decidir o que fazer se o login falhar após o cadastro.
        // Talvez redirecionar para /login com uma mensagem.
        router.push("/login");
      } else if (result?.ok) {
        toast.success("Conta criada e login realizado com sucesso! Redirecionando...");
        router.push("/dashboard"); // Redireciona para o dashboard
      }
    } catch (error: unknown) {
      // Captura erros gerais de rede ou exceções lançadas pelo `fetch` ou `signIn`
      if (error instanceof Error) {
        toast.error(`Erro ao criar conta: ${error.message || "Tente novamente."}`);
        console.error("Erro no signup:", error);
      } else {
        toast.error("Erro desconhecido ao criar conta.");
        console.error("Erro desconhecido no signup:", error);
      }
    } finally {
      setIsLoading(false); // Desativa o estado de loading no final
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="mb-2">
          Nome Completo
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-destructive mt-1 text-sm">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-destructive mt-1 text-sm">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="mb-2">
          Senha
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && (
          <p className="text-destructive mt-1 text-sm">{errors.password}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="mb-2">
          Confirmar Senha
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.confirmPassword ? "border-destructive" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-destructive mt-1 text-sm">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2">Tipo de Conta</Label>
        <RadioGroup
          defaultValue={formData.accountType}
          onValueChange={handleAccountTypeChange}
          className="flex gap-4 pt-1"
          disabled={isLoading}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="contratante" id="type-contratante" />
            <Label htmlFor="type-contratante">Quero Contratar </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="musico" id="type-musico" />
            <Label htmlFor="type-musico">Sou Músico</Label>
          </div>
        </RadioGroup>
        {errors.accountType && (
          <p className="text-destructive mt-1 text-sm">{errors.accountType}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Criando Conta..." : "Criar Conta"}
      </Button>

      <div className="text-muted-foreground text-center text-sm">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary/90 underline"
        >
          Faça Login
        </Link>
      </div>
    </form>
  );
}
