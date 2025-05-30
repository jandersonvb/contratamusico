"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import { Toaster } from "sonner";
import { Card } from "@/app/_components/ui/card";

export default function ContactPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui, envie os dados para sua API ou serviço de e-mail
    setEnviado(true);
  };

  return (
    <section className="min-h-screen w-full bg-gray-100 px-4 py-12 text-black">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="mb-4 text-4xl font-bold text-black">Fale com a gente</h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
          Tem alguma dúvida, sugestão ou quer falar sobre parcerias? Preencha o
          formulário abaixo!
        </p>
      </div>

      {enviado ? (
        <Alert className="mx-auto max-w-lg">
          <AlertTitle>Mensagem enviada!</AlertTitle>
          <AlertDescription>
            Obrigado por entrar em contato. Responderemos em breve.
          </AlertDescription>
          <Toaster position="top-center" richColors />
        </Alert>
      ) : (
        <Card className="mx-auto max-w-lg bg-white p-6 shadow-md">
          <form className="max-w-lg space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nome" className="mb-1 block text-sm font-medium">
                Nome
              </label>
              <Input
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                E-mail
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="mensagem"
                className="mb-1 block text-sm font-medium"
              >
                Mensagem
              </label>
              <Textarea
                id="mensagem"
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-dark font-semibold text-white"
            >
              Enviar
            </Button>
          </form>
        </Card>
      )}
    </section>
  );
}
