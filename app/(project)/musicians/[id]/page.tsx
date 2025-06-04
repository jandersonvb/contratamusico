// app/(project)/musicians/[id]/page.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/avatar'; // Assuming path based on project structure
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Separator } from '@/app/_components/ui/separator'; // Assuming separator exists or needs creation
import { Youtube, MapPin, Star, Music, Calendar, Briefcase, MessageSquare, Link as LinkIcon } from 'lucide-react'; // Example icons

// Placeholder data - Replace with actual data fetching later
const musicianData = {
  id: '123',
  name: 'João Silva',
  artisticName: 'Johnny Rock',
  location: 'São Paulo, SP',
  profilePictureUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  coverImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', // Updated with a valid image URL
  bio: 'Músico experiente com mais de 10 anos de estrada, especializado em Rock Clássico e Blues. Toco guitarra, baixo e bateria. Disponível para shows, eventos e gravações.',
  experienceLevel: 'Profissional',
  influences: ['Led Zeppelin', 'Jimi Hendrix', 'Eric Clapton'],
  instruments: ['Guitarra Elétrica', 'Violão', 'Baixo'],
  genres: ['Rock Clássico', 'Blues', 'Hard Rock'],
  youtubeVideos: [
    { id: 'vid1', title: 'Solo Incrível', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: 'vid2', title: 'Show Acústico', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ],
  availability: 'Disponível principalmente nos fins de semana. Consultar para datas específicas.',
  services: [
    { name: 'Show Completo (Banda)', price: 'A combinar' },
    { name: 'Show Acústico (Voz e Violão)', price: 'R$ 500 - R$ 1000' },
    { name: 'Gravação em Estúdio (Guitarra)', price: 'R$ 150/hora' },
  ],
  reviews: [
    { id: 'rev1', reviewer: 'Contratante Feliz', rating: 5, comment: 'Show incrível, animou a festa toda!' },
    { id: 'rev2', reviewer: 'Produtor Musical', rating: 4, comment: 'Ótimo guitarrista, muito profissional.' },
  ],
  socialLinks: [
    { platform: 'Instagram', url: '#' },
    { platform: 'Facebook', url: '#' },
  ],
  averageRating: 4.5,
  contactInfo: 'joao.silva@email.com / (11) 99999-8888', // Define how to handle public/private later
};

interface MusicianProfilePageProps {
  params: { id: string };
}

const MusicianProfilePage: React.FC<MusicianProfilePageProps> = ({ params }) => {
  // TODO: Fetch musician data based on params.id using Prisma
  const musician = musicianData;

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      {/* Optional Cover Image */}
      {musician.coverImageUrl && (
        <div className="mb-8 h-40 md:h-52 lg:h-64 overflow-hidden rounded-lg">
          <img src={musician.coverImageUrl} alt={`${musician.artisticName} cover`} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-end mb-8 gap-4 md:gap-8 -mt-16 md:-mt-24 relative px-4">
        <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background bg-muted shadow-lg">
          <AvatarImage src={musician.profilePictureUrl} alt={musician.artisticName} />
          <AvatarFallback>{musician.artisticName?.charAt(0) ?? musician.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold">{musician.artisticName}</h1>
          <p className="text-lg text-muted-foreground">{musician.name}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
            <MapPin size={16} />
            <span>{musician.location}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < Math.round(musician.averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'} />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">({musician.reviews.length} avaliações)</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>Entrar em Contato</Button> {/* TODO: Implement contact logic/modal */}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Main Content Area - Could use Tabs or Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (or Main Column) */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre {musician.artisticName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">{musician.bio}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Nível de Experiência</h4>
                  <p className="text-muted-foreground">{musician.experienceLevel}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Influências</h4>
                  <p className="text-muted-foreground">{musician.influences.join(', ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Music Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Music size={20} /> Música</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Instrumentos</h4>
                <p className="text-muted-foreground">{musician.instruments.join(', ')}</p>
              </div>
              <div>
                <h4 className="font-semibold">Gêneros / Estilos</h4>
                <p className="text-muted-foreground">{musician.genres.join(', ')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Media Section (YouTube Videos) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Youtube size={20} /> Vídeos</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {musician.youtubeVideos.map(video => (
                <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="block border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {/* Basic placeholder, ideally fetch thumbnail */}
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Youtube size={48} className="text-muted-foreground" />
                  </div>
                  <p className="p-2 text-sm font-medium truncate">{video.title}</p>
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare size={20} /> Avaliações ({musician.reviews.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {musician.reviews.map(review => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{review.reviewer}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
              {/* TODO: Add 'Write a review' button if applicable */}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Availability Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar size={20} /> Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement Calendar View */}
              <p className="text-muted-foreground text-sm mb-4">Calendário de disponibilidade (a implementar).</p>
              <p className="text-muted-foreground">{musician.availability}</p>
            </CardContent>
          </Card>

          {/* Services & Pricing Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase size={20} /> Serviços e Preços</CardTitle>
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
              <CardTitle className="flex items-center gap-2"><LinkIcon size={20} /> Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {musician.socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
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

