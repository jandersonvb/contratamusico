// "use client";

// import React, { useState } from "react";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/app/_components/ui/card";
// import { Input } from "@/app/_components/ui/input";
// import { Label } from "@/app/_components/ui/label";
// import { Button } from "@/app/_components/ui/button";
// import { ArrowLeft } from "lucide-react";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage("");

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setMessage("A reset link has been sent to your email.");
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//       console.error("Error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-muted/40 flex min-h-screen items-center justify-center">
//       <div className="w-full max-w-md">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Esqueceu a senha</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <Label htmlFor="email" className="mb-3">
//                   Email
//                 </Label>
//                 <Input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <Button type="submit" disabled={isSubmitting} className="w-full">
//                 {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
//               </Button>
//             </form>
//             {message && (
//               <p className="mt-4 text-center text-sm text-green-600">
//                 {message}
//               </p>
//             )}
//           </CardContent>
//           <CardFooter className="align-items-center justify-center text-center">
//             <a
//               href="/auth/login"
//               className="flex items-center justify-center text-white hover:underline"
//             >
//               <ArrowLeft className="mr-2" />
//               voltar para o login
//             </a>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }

// app/(auth)/forgot-password/page.tsx
// Server Component para a página de Esqueceu a Senha.
import { auth } from "@/app/lib/auth"; // Para autenticação e redirecionamento
import { redirect } from "next/navigation"; // Para redirecionamento no servidor

import Link from "next/link";
import Image from "next/image"; // Para a imagem lateral
import { ForgotPasswordForm } from "@/app/components/ForgotPasswordForm/ForgotPasswordForm"; // Importa o novo formulário

export default async function ForgotPasswordPage() {
  const session = await auth();

  // Se o usuário já estiver logado, redireciona para o dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      {/* Coluna da Esquerda: Imagem/Branding (Visível apenas em telas grandes) */}
      <div className="relative hidden w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-800 p-8 lg:flex">
        <Image
          src="/images/forgot-password-background-music.jpg" // Imagem temática de "memória" ou "solução"
          alt="Luz em um palco vazio"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-40"
        />
        <div className="relative z-10 space-y-4 px-8 text-center text-white">
          <h1 className="text-4xl leading-tight font-bold drop-shadow-md">
            O Som do Seu Evento Não Pode Parar!
          </h1>
          <p className="text-lg font-light opacity-90">
            Acontece. Vamos te ajudar a recuperar o acesso à sua conta
            rapidinho.
          </p>
        </div>
      </div>

      {/* Coluna da Direita: Formulário de Esqueceu a Senha */}
      <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
        <div className="bg-card border-border w-full max-w-md space-y-8 rounded-lg border p-8 shadow-lg">
          <div className="text-center">
            {/* Logo do ContrataMusico */}
            <Link
              href="/"
              className="text-foreground mb-6 inline-block text-3xl font-extrabold no-underline"
            >
              <span>Contrata</span>
              <span className="text-primary">Musico</span>
            </Link>
            <h2 className="text-foreground mt-2 text-3xl font-extrabold">
              Redefinir Sua Senha
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Informe seu e-mail para enviarmos um link de redefinição.
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
