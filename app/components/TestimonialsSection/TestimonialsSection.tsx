// // components/TestimonialsSection/TestimonialsSection.tsx
// import { Quote } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar"; // Assumindo que você tem Avatar do Shadcn

// interface TestimonialCardProps {
//   quote: string;
//   authorName: string;
//   authorTitle: string;
//   avatarSrc?: string;
// }

// function TestimonialCard({ quote, authorName, authorTitle, avatarSrc }: TestimonialCardProps) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
//       <Quote className="h-8 w-8 text-pink-500 mb-4" />
//       <p className="text-lg text-gray-700 italic mb-6">"{quote}"</p>
//       <Avatar className="h-16 w-16 mb-3">
//         {avatarSrc ? <AvatarImage src={avatarSrc} alt={authorName} /> : <AvatarFallback>{authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>}
//       </Avatar>
//       <p className="font-bold text-gray-800">{authorName}</p>
//       <p className="text-sm text-gray-600">{authorTitle}</p>
//     </div>
//   );
// }

// export function TestimonialsSection() {
//   const testimonials = [
//     {
//       quote: "Encontrei a banda perfeita para o meu casamento em tempo recorde! Experiência incrível.",
//       authorName: "Maria Silva",
//       authorTitle: "Noiva Satisfeita",
//       avatarSrc: "/images/avatar-maria.jpg",
//     },
//     {
//       quote: "Minha agenda de shows triplicou depois que comecei a usar a plataforma. Simplesmente mudou minha carreira!",
//       authorName: "João Guitarrista",
//       authorTitle: "Músico Profissional",
//       avatarSrc: "/images/avatar-joao.jpg",
//     },
//     // Adicione mais testemunhos
//   ];

//   return (
//     <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
//       <div className="mx-auto max-w-6xl px-4 text-center">
//         <h2 className="mb-12 text-3xl font-bold md:text-4xl">
//           O Que Nossos Usuários Dizem
//         </h2>
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {testimonials.map((testimonial, index) => (
//             <TestimonialCard key={index} {...testimonial} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// app/components/landing/TestimonialsSection.tsx
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Star } from "lucide-react"; // Ícone

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        "ContrataMusico revolucionou a forma como encontramos talentos para nossos eventos. Prático, rápido e seguro!",
      author: "Ana Clara Silva",
      role: "Organizadora de Eventos",
      avatar: "/images/avatar-ana.jpg", // Adicione imagem na public/images
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Nunca tive tantas propostas de shows como agora. Meu perfil na plataforma me deu uma visibilidade incrível.",
      author: "Lucas Rodrigues",
      role: "Vocalista e Guitarrista",
      avatar: "/images/avatar-lucas.jpg",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "A variedade de músicos é impressionante! Encontrei exatamente o estilo que precisava para meu casamento. Super recomendo.",
      author: "Mariana Souza",
      role: "Noiva e Contratante",
      avatar: "/images/avatar-mariana.jpg",
      rating: 5,
    },
  ];

  return (
    <section className="text-center">
      <h2 className="text-foreground mb-12 text-3xl font-bold md:text-4xl">
        O Que Dizem Nossos Usuários?
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="bg-card text-card-foreground p-6 shadow-md"
          >
            <CardContent className="p-0">
              <div className="mb-4 flex justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 text-lg italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center space-x-3">
                <Avatar className="border-primary h-12 w-12 border-2">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.author}
                  />
                  <AvatarFallback>
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-foreground font-semibold">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
