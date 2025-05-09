"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage("A reset link has been sent to your email.");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Esqueceu a senha</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email" className="mb-3">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
              </Button>
            </form>
            {message && (
              <p className="mt-4 text-center text-sm text-green-600">
                {message}
              </p>
            )}
          </CardContent>
          <CardFooter className="align-items-center justify-center text-center">
            <a
              href="/auth/login"
              className="flex items-center justify-center text-white hover:underline"
            >
              <ArrowLeft className="mr-2" />
              voltar para o login
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
