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
import { signupUserApi } from "@/app/api";
import type { AccountType } from "@/app/lib/types/auth";
import { useAuthStore } from "@/app/lib/stores/authStore";

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

  const { setSession } = useAuthStore();

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
      console.warn("Tipo de conta inválido selecionado:", value);
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
    } else if (formData.password.length < 6) {
      // Já estamos validando 6 no backend
      newErrors.password = "A senha deve ter no mínimo 6 caracteres.";
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
      const response = await signupUserApi({
        fullName: formData.name, // 'name' do formulário para 'fullName' da API
        email: formData.email,
        password: formData.password,
        accountType: formData.accountType, // Já é AccountType
      });

      if (!response) {
        toast.error("Erro ao criar conta. Tente novamente.");
        setIsLoading(false);
        return;
      }

      // Sucesso no cadastro
      setSession({
        accessToken: response.accessToken,
        user: {
          id: response.user.id,
          fullName: response.user.fullName,
          email: response.user.email,
          accountType: response.user.accountType,
        },
      });
      toast.success("Conta criada com sucesso!");
      router.push("/dashboard"); // Redireciona para o dashboard após o cadastro
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      if (error instanceof Error) {
        // Se o erro for uma instância de Error, exibe a mensagem de erro
        toast.error(error.message || "Erro ao criar conta. Tente novamente.");
      } else {
        // Se o erro não for uma instância de Error, exibe uma mensagem genérica
        toast.error("Erro desconhecido ao criar conta. Tente novamente.");
      }
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
