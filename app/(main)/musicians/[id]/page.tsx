// app/(project)/musicians/[id]/page.tsx
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar"; // Assuming path based on project structure
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator"; // Assuming separator exists or needs creation
import {
  Youtube,
  MapPin,
  Star,
  Music,
  Calendar,
  Briefcase,
  MessageSquare,
  Link as LinkIcon,
} from "lucide-react"; // Example icons

import Image from "next/image"; // Using Next.js Image component for optimized images

// Placeholder data - Replace with actual data fetching later
const musicianData = {
  id: "123",
  name: "João Silva",
  artisticName: "Johnny Rock",
  location: "São Paulo, SP",
  profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  coverImageUrl:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", // Updated with a valid image URL
  bio: "Músico experiente com mais de 10 anos de estrada, especializado em Rock Clássico e Blues. Toco guitarra, baixo e bateria. Disponível para shows, eventos e gravações.",
  experienceLevel: "Profissional",
  influences: ["Led Zeppelin", "Jimi Hendrix", "Eric Clapton"],
  instruments: ["Guitarra Elétrica", "Violão", "Baixo"],
  genres: ["Rock Clássico", "Blues", "Hard Rock"],
  youtubeVideos: [
    {
      id: "vid1",
      title: "Solo Incrível",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "vid2",
      title: "Show Acústico",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
  availability:
    "Disponível principalmente nos fins de semana. Consultar para datas específicas.",
  services: [
    { name: "Show Completo (Banda)", price: "A combinar" },
    { name: "Show Acústico (Voz e Violão)", price: "R$ 500 - R$ 1000" },
    { name: "Gravação em Estúdio (Guitarra)", price: "R$ 150/hora" },
  ],
  reviews: [
    {
      id: "rev1",
      reviewer: "Contratante Feliz",
      rating: 5,
      comment: "Show incrível, animou a festa toda!",
    },
    {
      id: "rev2",
      reviewer: "Produtor Musical",
      rating: 4,
      comment: "Ótimo guitarrista, muito profissional.",
    },
  ],
  socialLinks: [
    { platform: "Instagram", url: "#" },
    { platform: "Facebook", url: "#" },
  ],
  averageRating: 4.5,
  contactInfo: "joao.silva@email.com / (11) 99999-8888", // Define how to handle public/private later
};

interface MusicianProfilePageProps {
  params: { id: string };
}

const MusicianProfilePage: React.FC<MusicianProfilePageProps> = () => {
  // TODO: Fetch musician data based on params.id using Prisma
  const musician = musicianData;

  return (
    <div className="bg-background text-foreground container mx-auto px-4 py-8">
      {/* Optional Cover Image */}
      {musician.coverImageUrl && (
        <div className="mb-8 h-40 overflow-hidden rounded-lg md:h-52 lg:h-64">
          <Image
            src={musician.coverImageUrl}
            alt={`${musician.artisticName} cover`}
            className="h-full w-full object-cover"
            width={800}
            height={256}
          />
        </div>
      )}

      {/* Header Section */}
      <div className="relative -mt-16 mb-8 flex flex-col items-center gap-4 px-4 md:-mt-24 md:flex-row md:items-end md:gap-8">
        <Avatar className="border-background bg-muted h-32 w-32 border-4 shadow-lg md:h-40 md:w-40">
          <AvatarImage
            src={musician.profilePictureUrl}
            alt={musician.artisticName}
          />
          <AvatarFallback>
            {musician.artisticName?.charAt(0) ?? musician.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="mt-4 flex-1 text-center md:mt-0 md:text-left">
          <h1 className="text-3xl font-bold md:text-4xl">
            {musician.artisticName}
          </h1>
          <p className="text-muted-foreground text-lg">{musician.name}</p>
          <div className="text-muted-foreground mt-2 flex items-center justify-center gap-2 md:justify-start">
            <MapPin size={16} />
            <span>{musician.location}</span>
          </div>
          <div className="mt-1 flex items-center justify-center gap-1 md:justify-start">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(musician.averageRating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground"
                }
              />
            ))}
            <span className="text-muted-foreground ml-1 text-sm">
              ({musician.reviews.length} avaliações)
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>Entrar em Contato</Button>{" "}
          {/* TODO: Implement contact logic/modal */}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Main Content Area - Could use Tabs or Sections */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column (or Main Column) */}
        <div className="space-y-8 lg:col-span-2">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre {musician.artisticName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {musician.bio}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold">Nível de Experiência</h4>
                  <p className="text-muted-foreground">
                    {musician.experienceLevel}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Influências</h4>
                  <p className="text-muted-foreground">
                    {musician.influences.join(", ")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Music Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music size={20} /> Música
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-semibold">Instrumentos</h4>
                <p className="text-muted-foreground">
                  {musician.instruments.join(", ")}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Gêneros / Estilos</h4>
                <p className="text-muted-foreground">
                  {musician.genres.join(", ")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Media Section (YouTube Videos) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube size={20} /> Vídeos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {musician.youtubeVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg border transition-shadow hover:shadow-md"
                >
                  {/* Basic placeholder, ideally fetch thumbnail */}
                  <div className="bg-muted flex aspect-video items-center justify-center">
                    <Youtube size={48} className="text-muted-foreground" />
                  </div>
                  <p className="truncate p-2 text-sm font-medium">
                    {video.title}
                  </p>
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare size={20} /> Avaliações (
                {musician.reviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {musician.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-semibold">{review.reviewer}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {review.comment}
                  </p>
                </div>
              ))}
              {/* TODO: Add 'Write a review' button if applicable */}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8 lg:col-span-1">
          {/* Availability Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} /> Disponibilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement Calendar View */}
              <p className="text-muted-foreground mb-4 text-sm">
                Calendário de disponibilidade (a implementar).
              </p>
              <p className="text-muted-foreground">{musician.availability}</p>
            </CardContent>
          </Card>

          {/* Services & Pricing Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase size={20} /> Serviços e Preços
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {musician.services.map((service, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{service.name}</p>
                  <p className="text-muted-foreground">{service.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon size={20} /> Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {musician.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  {/* Add icons based on platform later */}
                  <LinkIcon size={14} />
                  <span>{link.platform}</span>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicianProfilePage;
