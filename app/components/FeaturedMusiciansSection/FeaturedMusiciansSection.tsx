// // components/FeaturedMusiciansSection/FeaturedMusiciansSection.tsx
// // Este componente provavelmente seria um Server Component se os dados vierem de uma API.

// import { Button } from "@/app/_components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
// import { Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// // Simulação de dados de músicos
// const featuredMusicians = [
//   {
//     id: "1",
//     name: "Ana Costa",
//     instrument: "Voz e Violão (MPB)",
//     location: "Rio de Janeiro",
//     imageUrl: "/images/musico1.jpg", // Substitua por imagens reais
//     rating: 4.9,
//   },
//   {
//     id: "2",
//     name: "Banda Groove Alive",
//     instrument: "Pop/Rock",
//     location: "São Paulo",
//     imageUrl: "/images/musico2.jpg",
//     rating: 4.7,
//   },
//   {
//     id: "3",
//     name: "Quarteto de Cordas Harmony",
//     instrument: "Clássico",
//     location: "Belo Horizonte",
//     imageUrl: "/images/musico3.jpg",
//     rating: 5.0,
//   },
//   {
//     id: "4",
//     name: "DJ Beat Maker",
//     instrument: "Eletrônica/Funk",
//     location: "Curitiba",
//     imageUrl: "/images/musico4.jpg",
//     rating: 4.8,
//   },
// ];

// export async function FeaturedMusiciansSection() {
//   // Em uma aplicação real, você faria uma chamada de API aqui:
//   // const musicians = await fetch('/api/featured-musicians').then(res => res.json());

//   return (
//     <section className="py-16">
//       <div className="mx-auto max-w-6xl px-4 text-center">
//         <h2 className="mb-12 text-3xl font-bold text-gray-800 md:text-4xl">
//           Músicos em Destaque
//         </h2>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {featuredMusicians.map((musician) => (
//             <Link href={`/musicos/${musician.id}`} key={musician.id}>
//               <Card className="group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
//                 <div className="relative h-48 w-full">
//                   <Image
//                     src={musician.imageUrl}
//                     alt={musician.name}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     className="object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>
//                 <CardHeader>
//                   <CardTitle className="truncate text-xl font-semibold">
//                     {musician.name}
//                   </CardTitle>
//                   <CardDescription className="text-gray-600">
//                     {musician.instrument} - {musician.location}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between text-sm text-gray-700">
//                     <span className="flex items-center">
//                       <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
//                       {musician.rating}
//                     </span>
//                     {/* Preço ou outro detalhe aqui se houver */}
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//         <div className="mt-12">
//           <Link href="/musicos">
//             <Button variant="default" size="lg">
//               Ver Todos os Músicos
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// app/components/landing/FeaturedMusiciansSection.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Music, Star, ArrowRight } from "lucide-react"; // Ícones

export function FeaturedMusiciansSection() {
  // Mock de dados de músicos
  const musicians = [
    {
      id: "1",
      name: "Banda Acústica Sonora",
      specialty: "Pop Acústico, MPB",
      location: "São Paulo, SP",
      rating: 4.9,
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      id: "2",
      name: "DJ Ritmik",
      specialty: "Eletrônica, Funk Carioca",
      location: "Rio de Janeiro, RJ",
      rating: 4.7,
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      id: "3",
      name: "Quarteto Jazz Fusion",
      specialty: "Jazz, Blues",
      location: "Belo Horizonte, MG",
      rating: 5.0,
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      id: "4",
      name: "Samba Show Alegria",
      specialty: "Samba, Pagode",
      location: "Salvador, BA",
      rating: 4.8,
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
  ];

  return (
    <section className="text-center">
      <h2 className="text-foreground mb-12 text-3xl font-bold md:text-4xl">
        Conheça Alguns de Nossos Talentos em Destaque
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {musicians.map((musician) => (
          <Card
            key={musician.id}
            className="bg-card text-card-foreground overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="relative h-48 w-full">
              <Image
                src={musician.imageUrl}
                alt={`Foto de ${musician.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <CardHeader className="pt-4 pb-2 text-left">
              <CardTitle className="text-xl font-semibold">
                {musician.name}
              </CardTitle>
              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <Music className="h-4 w-4" /> {musician.specialty}
              </p>
              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <MapPin className="h-4 w-4" /> {musician.location}
              </p>
            </CardHeader>
            <CardContent className="p-0 px-6 text-left">
              <div className="flex items-center text-sm font-semibold text-yellow-500">
                <Star className="mr-1 h-4 w-4 fill-yellow-500" />{" "}
                {musician.rating.toFixed(1)}
                <span className="text-muted-foreground ml-1 text-xs">
                  (50 avaliações)
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
              <Link href={`/musicos/${musician.id}`}>
                <Button variant="default">
                  Ver Perfil <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Link href="#" className="mt-12 inline-block">
        <Button variant="outline" size="lg">
          Explore Todos os Músicos <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </section>
  );
}
