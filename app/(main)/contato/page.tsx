// "use client";

// import { useState } from "react";
// import { Button } from "@/app/_components/ui/button";
// import { Input } from "@/app/_components/ui/input";
// import { Textarea } from "@/app/_components/ui/textarea";
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from "@/app/_components/ui/alert";
// import { Toaster } from "sonner";
// import { Card } from "@/app/_components/ui/card";

// export default function ContactPage() {
//   const [form, setForm] = useState({
//     nome: "",
//     email: "",
//     mensagem: "",
//   });
//   const [enviado, setEnviado] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Aqui, envie os dados para sua API ou serviço de e-mail
//     setEnviado(true);
//   };

//   return (
//     <section className="min-h-screen w-full bg-gray-100 px-4 py-12 text-black">
//       <div className="mx-auto max-w-lg text-center">
//         <h1 className="mb-4 text-4xl font-bold text-black">Fale com a gente</h1>
//         <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
//           Tem alguma dúvida, sugestão ou quer falar sobre parcerias? Preencha o
//           formulário abaixo!
//         </p>
//       </div>

//       {enviado ? (
//         <Alert className="mx-auto max-w-lg">
//           <AlertTitle>Mensagem enviada!</AlertTitle>
//           <AlertDescription>
//             Obrigado por entrar em contato. Responderemos em breve.
//           </AlertDescription>
//           <Toaster position="top-center" richColors />
//         </Alert>
//       ) : (
//         <Card className="mx-auto max-w-lg bg-white p-6 shadow-md">
//           <form className="max-w-lg space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="nome" className="mb-1 block text-sm font-medium">
//                 Nome
//               </label>
//               <Input
//                 type="text"
//                 id="nome"
//                 name="nome"
//                 value={form.nome}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="mb-1 block text-sm font-medium">
//                 E-mail
//               </label>
//               <Input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="mensagem"
//                 className="mb-1 block text-sm font-medium"
//               >
//                 Mensagem
//               </label>
//               <Textarea
//                 id="mensagem"
//                 name="mensagem"
//                 value={form.mensagem}
//                 onChange={handleChange}
//                 rows={5}
//                 required
//               />
//             </div>
//             <Button
//               type="submit"
//               className="bg-primary hover:bg-primary-dark font-semibold text-white"
//             >
//               Enviar
//             </Button>
//           </form>
//         </Card>
//       )}
//     </section>
//   );
// }

// app/(main)/contato/page.tsx
// Server Component

import { ContactForm } from "@/app/components/ContactForm/ContactForm"; // Importa o novo formulário de contato
import { MapPin, Mail, Phone } from "lucide-react"; // Ícones

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground flex flex-col items-center py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">Fale Conosco</h1>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg">
          Tem alguma dúvida, sugestão ou precisa de suporte? Envie-nos uma
          mensagem ou entre em contato pelos canais abaixo.
        </p>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coluna da Esquerda: Informações de Contato */}
          <div className="space-y-8 text-left">
            <h2 className="text-foreground text-2xl font-bold">
              Informações de Contato
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-primary h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold">E-mail</p>
                  <a
                    href="mailto:contato@contratamusico.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    contato@contratamusico.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold">Telefone</p>
                  <a
                    href="tel:+5535999999999"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (35) 9 9999-9999
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold">Endereço</p>
                  <p className="text-muted-foreground">
                    Avenida Padre Lourenço da Costa, 3415
                    <br />
                    Morro Grande, Itajubá - MG, Brasil
                  </p>
                  <p className="text-muted-foreground">CEP: 37502-710</p>
                </div>
              </div>
            </div>
            {/* Você pode adicionar aqui um mapa do Google Maps embedado, se desejar */}
          </div>

          {/* Coluna da Direita: Formulário de Contato */}
          <div className="text-left">
            <h2 className="text-foreground mb-6 text-2xl font-bold">
              Envie-nos uma Mensagem
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
