// components/TestimonialsSection/TestimonialsSection.tsx
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar"; // Assumindo que você tem Avatar do Shadcn

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarSrc?: string;
}

function TestimonialCard({ quote, authorName, authorTitle, avatarSrc }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
      <Quote className="h-8 w-8 text-pink-500 mb-4" />
      <p className="text-lg text-gray-700 italic mb-6">"{quote}"</p>
      <Avatar className="h-16 w-16 mb-3">
        {avatarSrc ? <AvatarImage src={avatarSrc} alt={authorName} /> : <AvatarFallback>{authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>}
      </Avatar>
      <p className="font-bold text-gray-800">{authorName}</p>
      <p className="text-sm text-gray-600">{authorTitle}</p>
    </div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Encontrei a banda perfeita para o meu casamento em tempo recorde! Experiência incrível.",
      authorName: "Maria Silva",
      authorTitle: "Noiva Satisfeita",
      avatarSrc: "/images/avatar-maria.jpg",
    },
    {
      quote: "Minha agenda de shows triplicou depois que comecei a usar a plataforma. Simplesmente mudou minha carreira!",
      authorName: "João Guitarrista",
      authorTitle: "Músico Profissional",
      avatarSrc: "/images/avatar-joao.jpg",
    },
    // Adicione mais testemunhos
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">
          O Que Nossos Usuários Dizem
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}