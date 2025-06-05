// app/components/forms/ContactForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { Textarea } from "@/app/_components/ui/textarea";
import { toast } from "sonner"; // Para feedback ao usuário

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Assunto é obrigatório.";
    if (!formData.message.trim()) newErrors.message = "Mensagem é obrigatória.";

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
      // Simulação de chamada de API para enviar o formulário de contato
      // Em uma aplicação real, você faria uma requisição POST para seu backend
      // Ex: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Dados do formulário de contato:", formData);
      toast.success(
        "Mensagem enviada com sucesso! Em breve retornaremos o contato.",
      );
      setFormData({ name: "", email: "", subject: "", message: "" }); // Limpa o formulário
    } catch (error) {
      console.error("Erro ao enviar mensagem de contato:", error);
      toast.error("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="mb-2">
          Seu Nome
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome completo"
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
          Seu E-mail
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
        <Label htmlFor="subject" className="mb-2">
          Assunto
        </Label>
        <Input
          id="subject"
          type="text"
          placeholder="Ex: Dúvida sobre planos, Suporte técnico"
          value={formData.subject}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.subject ? "border-destructive" : ""}
        />
        {errors.subject && (
          <p className="text-destructive mt-1 text-sm">{errors.subject}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="mb-2">
          Sua Mensagem
        </Label>
        <Textarea
          id="message"
          placeholder="Escreva sua mensagem aqui..."
          value={formData.message}
          onChange={handleChange}
          rows={6}
          disabled={isLoading}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && (
          <p className="text-destructive mt-1 text-sm">{errors.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Enviando Mensagem..." : "Enviar Mensagem"}
      </Button>
    </form>
  );
}
