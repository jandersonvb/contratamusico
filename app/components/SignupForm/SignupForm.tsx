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

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "contractor", // Padrão
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

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
    setFormData((prev) => ({ ...prev, accountType: value }));
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
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }
    if (!formData.accountType)
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
      // Simulação de chamada de API para registro.
      // Em uma aplicação real, você enviaria formData para sua API de registro.
      // Ex: await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Dados de cadastro:", formData);

      toast.success("Conta criada com sucesso! Redirecionando...");

      // TODO: Após o cadastro bem-sucedido, você pode querer:
      // 1. Logar o usuário automaticamente (usando signIn de next-auth/react).
      // 2. Redirecionar para uma página de onboarding específica (ex: /onboarding/musician-profile para músicos).
      // 3. Redirecionar para a página de login para que ele se autentique.

      // Para este exemplo, vamos redirecionar para a página de login
      router.push("/login"); // Lembre-se que a rota é /login, não /auth/login
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
      console.error("Erro de cadastro:", error);
    } finally {
      setIsLoading(false);
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
            <RadioGroupItem value="contractor" id="type-contractor" />
            <Label htmlFor="type-contractor">Quero Contratar </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="musician" id="type-musician" />
            <Label htmlFor="type-musician">Sou Músico</Label>
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
