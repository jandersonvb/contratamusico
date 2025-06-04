// app/components/forms/MusicianProfileForm.tsx
'use client';

import { useState, useRef } from 'react';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { Label } from '@/app/_components/ui/label';
import { Textarea } from '@/app/_components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { Checkbox } from '@/app/_components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/app/_components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/avatar';
import { toast } from 'sonner'; // Certifique-se de ter sonner instalado e configurado
import { Plus, X, UploadCloud, Volume2, Video, Image as ImageIcon, MapPin, Phone } from 'lucide-react'; // Ícones adicionais

// Tipagem para os dados do perfil do músico
interface MusicianProfileData {
  avatarUrl: string | null;
  name: string;
  bio: string;
  specialty: string;
  subSpecialties: string[]; // Ex: Guitarra Elétrica, Acústica
  experienceLevel: 'iniciante' | 'intermediario' | 'avancado' | 'profissional';
  genres: string[];
  instruments: string[];
  skills: string[]; // Ex: Leitura de partitura, improvisação, composição
  location: string;
  availability: string[]; // Dias da semana, períodos
  contactPhone: string;
  contactEmail: string; // Pode ser o mesmo do cadastro
  socialMediaLinks: { platform: string; url: string; }[];
  portfolioImages: { id: string; url: string; }[];
  portfolioAudios: { id: string; url: string; name: string; }[];
  portfolioVideos: { id: string; url: string; name: string; }[];
  priceRange: string; // Ex: "R$XXX - R$YYY por evento"
  acceptsTravel: boolean;
}

interface MusicianProfileFormProps {
  initialData?: MusicianProfileData | null;
}

export function MusicianProfileForm({ initialData }: MusicianProfileFormProps) {
  const [formData, setFormData] = useState<MusicianProfileData>(
    initialData || {
      avatarUrl: null,
      name: '',
      bio: '',
      specialty: '',
      subSpecialties: [],
      experienceLevel: 'iniciante',
      genres: [],
      instruments: [],
      skills: [],
      location: '',
      availability: [],
      contactPhone: '',
      contactEmail: '', // Geralmente pré-preenchido do cadastro
      socialMediaLinks: [],
      portfolioImages: [],
      portfolioAudios: [],
      portfolioVideos: [],
      priceRange: '',
      acceptsTravel: false,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState('personal'); // Controla a aba ativa

  // Arrays de opções pré-definidas
  const musicalSpecialties = [
    'Vocalista', 'Guitarrista', 'Baixista', 'Baterista', 'Tecladista',
    'Violinista', 'Violoncelista', 'Saxofonista', 'Trompetista', 'Pianista',
    'Violonista', 'Percussionista', 'Produtor Musical', 'Maestro', 'DJ', 'Outro'
  ];
  const musicalGenres = [
    'Rock', 'Pop', 'MPB', 'Samba', 'Jazz', 'Blues', 'Sertanejo',
    'Funk', 'Hip Hop', 'Eletrônica', 'Reggae', 'Clássica', 'Forró',
    'Axé', 'Gospel', 'Blues', 'Country', 'Folk', 'Indie', 'Metal', 'Soul', 'R&B', 'Outro'
  ];
  const instrumentsList = [
    'Guitarra', 'Violão', 'Baixo', 'Bateria', 'Teclado', 'Piano', 'Voz',
    'Violino', 'Violoncelo', 'Saxofone', 'Trompete', 'Flauta', 'Clarinete',
    'Acordeão', 'Gaita', 'Percussão', 'Cavaquinho', 'Ukulele', 'Banjolele', 'Outro'
  ];
  const skillsList = [
    'Leitura de Partitura', 'Improvisação', 'Composição', 'Arranjo', 'Produção',
    'Mixagem', 'Masterização', 'Ensino', 'Direção Musical', 'Edição de Áudio', 'Engenharia de Som'
  ];
  const availabilityOptions = [
    'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira',
    'Sexta-feira', 'Sábado', 'Domingo', 'Período Matutino',
    'Período Vespertino', 'Período Noturno'
  ];
  const experienceLevels = [
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediario', label: 'Intermediário' },
    { value: 'avancado', label: 'Avançado' },
    { value: 'profissional', label: 'Profissional' },
  ];

  const fileInputRefAvatar = useRef<HTMLInputElement>(null);
  const fileInputRefImages = useRef<HTMLInputElement>(null);
  const fileInputRefAudios = useRef<HTMLInputElement>(null);
  const fileInputRefVideos = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string, id: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleArrayChange = (item: string, isChecked: boolean, field: keyof MusicianProfileData) => {
    setFormData((prev) => {
      const currentArray = prev[field] as string[];
      const newArray = isChecked
        ? [...currentArray, item]
        : currentArray.filter((g) => g !== item);
      return { ...prev, [field]: newArray };
    });
    if (errors[field as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'image' | 'audio' | 'video') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Simulação de upload. Em um caso real, você faria upload para S3, Cloudinary, etc.
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (type === 'avatar') {
        setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
        toast.success("Avatar selecionado!");
      } else {
        const newAsset = { id: Date.now().toString(), url: reader.result as string, name: file.name };
        if (type === 'image') {
          setFormData(prev => ({ ...prev, portfolioImages: [...prev.portfolioImages, newAsset] }));
          toast.success("Imagem adicionada ao portfólio!");
        } else if (type === 'audio') {
          setFormData(prev => ({ ...prev, portfolioAudios: [...prev.portfolioAudios, newAsset] }));
          toast.success("Áudio adicionado ao portfólio!");
        } else if (type === 'video') {
          setFormData(prev => ({ ...prev, portfolioVideos: [...prev.portfolioVideos, newAsset] }));
          toast.success("Vídeo adicionado ao portfólio!");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = (idToRemove: string, field: 'portfolioImages' | 'portfolioAudios' | 'portfolioVideos') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item.id !== idToRemove)
    }));
    toast.info("Item de mídia removido.");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validação para a aba "Informações Pessoais"
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!formData.bio.trim()) newErrors.bio = 'Biografia é obrigatória.';
    if (!formData.location.trim()) newErrors.location = 'Localização é obrigatória.';

    // Validação para a aba "Detalhes Musicais"
    if (!formData.specialty) newErrors.specialty = 'Especialidade principal é obrigatória.';
    if (formData.genres.length === 0) newErrors.genres = 'Selecione pelo menos um gênero musical.';
    if (formData.instruments.length === 0) newErrors.instruments = 'Selecione pelo menos um instrumento.';
    // experienceLevel já tem um valor padrão, então não precisa de validação de vazio

    // Validação para a aba "Contato e Preferências"
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Telefone de contato é obrigatório.';
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/.test(formData.contactPhone.replace(/\D/g, ''))) {
      newErrors.contactPhone = 'Telefone inválido (use o formato XX XXXXX-XXXX).';
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'E-mail de contato é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'E-mail de contato inválido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário antes de enviar.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulação de chamada de API para salvar o perfil
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Dados do perfil do músico para salvar:', formData);

      toast.success('Perfil de músico salvo com sucesso!');
      // TODO: Redirecionar para o dashboard do músico ou página de perfil
      // router.push('/dashboard/musician/profile');
    } catch (error) {
      toast.error('Erro ao salvar perfil. Tente novamente.');
      console.error('Erro ao salvar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-auto flex-wrap gap-2 md:gap-0">
          <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="musical">Detalhes Musicais</TabsTrigger>
          <TabsTrigger value="media">Mídia (Portfólio)</TabsTrigger>
          <TabsTrigger value="contact">Contato e Preferências</TabsTrigger>
          <TabsTrigger value="social" className="hidden lg:block">Redes Sociais</TabsTrigger> {/* Opcional: aba separada para redes sociais */}
        </TabsList>

        {/* Tab 1: Informações Pessoais */}
        <TabsContent value="personal" className="space-y-6 mt-6">
          <h2 className="text-xl font-bold text-foreground">Sua Essência</h2>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border-2 border-primary shadow-md">
              <AvatarImage src={formData.avatarUrl || '/placeholder-avatar.png'} alt="Avatar do Músico" />
              <AvatarFallback className="text-xl font-semibold bg-muted-foreground text-muted">
                {formData.name ? formData.name[0]?.toUpperCase() : '?'}
              </AvatarFallback>
            </Avatar>
            <Input
              type="file"
              ref={fileInputRefAvatar}
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'avatar')}
              className="hidden"
            />
            <Button type="button" onClick={() => fileInputRefAvatar.current?.click()} disabled={isLoading} variant="outline">
              <UploadCloud className="mr-2 h-4 w-4" /> Enviar Avatar
            </Button>
            {errors.avatarUrl && <p className="text-sm text-destructive mt-1">{errors.avatarUrl}</p>}
          </div>

          <div>
            <Label htmlFor="name">Nome Artístico / Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome artístico ou completo"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="bio">Biografia / Sobre Mim</Label>
            <Textarea
              id="bio"
              placeholder="Fale sobre sua paixão pela música, experiência, estilo e o que te diferencia."
              value={formData.bio}
              onChange={handleChange}
              rows={6}
              disabled={isLoading}
              className={errors.bio ? 'border-destructive' : ''}
            />
            {errors.bio && <p className="text-sm text-destructive mt-1">{errors.bio}</p>}
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" /> Localização (Cidade/Estado)
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="Ex: Itajubá, MG"
              value={formData.location}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.location ? 'border-destructive' : ''}
            />
            {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
          </div>
        </TabsContent>

        {/* Tab 2: Detalhes Musicais */}
        <TabsContent value="musical" className="space-y-6 mt-6">
          <h2 className="text-xl font-bold text-foreground">Seus Talentos Musicais</h2>

          <div>
            <Label htmlFor="specialty">Especialidade Principal</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, 'specialty')}
              value={formData.specialty}
              disabled={isLoading}
            >
              <SelectTrigger className={errors.specialty ? 'border-destructive' : ''}>
                <SelectValue placeholder="Selecione sua principal especialidade" />
              </SelectTrigger>
              <SelectContent>
                {musicalSpecialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.specialty && <p className="text-sm text-destructive mt-1">{errors.specialty}</p>}
          </div>

          <div>
            <Label>Instrumentos (selecione os que você toca)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2 max-h-60 overflow-y-auto pr-2">
              {instrumentsList.map((instrument) => (
                <div key={instrument} className="flex items-center space-x-2">
                  <Checkbox
                    id={`instrument-${instrument}`}
                    checked={formData.instruments.includes(instrument)}
                    onCheckedChange={(checked) => handleArrayChange(instrument, !!checked, 'instruments')}
                    disabled={isLoading}
                  />
                  <Label htmlFor={`instrument-${instrument}`}>{instrument}</Label>
                </div>
              ))}
            </div>
            {errors.instruments && <p className="text-sm text-destructive mt-1">{errors.instruments}</p>}
          </div>

          <div>
            <Label>Gêneros Musicais (selecione os que você atua)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2 max-h-60 overflow-y-auto pr-2">
              {musicalGenres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={formData.genres.includes(genre)}
                    onCheckedChange={(checked) => handleArrayChange(genre, !!checked, 'genres')}
                    disabled={isLoading}
                  />
                  <Label htmlFor={`genre-${genre}`}>{genre}</Label>
                </div>
              ))}
            </div>
            {errors.genres && <p className="text-sm text-destructive mt-1">{errors.genres}</p>}
          </div>

          <div>
            <Label>Nível de Experiência</Label>
            <RadioGroup
              value={formData.experienceLevel}
              onValueChange={(value: typeof formData.experienceLevel) => handleSelectChange(value, 'experienceLevel')}
              className="flex flex-wrap gap-4 mt-2"
              disabled={isLoading}
            >
              {experienceLevels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.value} id={`level-${level.value}`} />
                  <Label htmlFor={`level-${level.value}`}>{level.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label>Habilidades Adicionais (opcional)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2 max-h-60 overflow-y-auto pr-2">
              {skillsList.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={formData.skills.includes(skill)}
                    onCheckedChange={(checked) => handleArrayChange(skill, !!checked, 'skills')}
                    disabled={isLoading}
                  />
                  <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Mídia (Portfólio) */}
        <TabsContent value="media" className="space-y-6 mt-6">
          <h2 className="text-xl font-bold text-foreground">Seu Portfólio de Mídia</h2>
          <p className="text-sm text-muted-foreground">Adicione fotos, áudios e vídeos para mostrar seu trabalho.</p>

          {/* Imagens */}
          <div>
            <Label className="flex items-center gap-2 mb-2"><ImageIcon className="h-4 w-4" /> Fotos</Label>
            <Input
              type="file"
              ref={fileInputRefImages}
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, 'image')}
              className="hidden"
            />
            <Button type="button" onClick={() => fileInputRefImages.current?.click()} disabled={isLoading} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Imagem
            </Button>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {formData.portfolioImages.map((img) => (
                <div key={img.id} className="relative group rounded-md overflow-hidden shadow-sm border border-border">
                  <img src={img.url} alt={`Portfólio Imagem ${img.id}`} className="w-full h-32 object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMedia(img.id, 'portfolioImages')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Áudios */}
          <div>
            <Label className="flex items-center gap-2 mb-2"><Volume2 className="h-4 w-4" /> Áudios (Links do YouTube/Spotify/Soundcloud)</Label>
            <Input
              id="newAudioLink"
              type="url"
              placeholder="Cole o link do YouTube, Spotify, Soundcloud..."
            // Não vincula diretamente ao state para múltiplos links, você precisaria de um array de inputs ou adicionar um por um
            />
            <Button type="button" disabled={isLoading} variant="secondary" className="w-full mt-2"
              onClick={() => toast.info("Funcionalidade de adicionar link de áudio em desenvolvimento.")}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Link de Áudio
            </Button>
            <div className="mt-4 space-y-2">
              {formData.portfolioAudios.map((audio) => (
                <div key={audio.id} className="flex items-center justify-between p-2 rounded-md bg-muted text-muted-foreground">
                  <span className="truncate">{audio.name || audio.url}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeMedia(audio.id, 'portfolioAudios')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Vídeos */}
          <div>
            <Label className="flex items-center gap-2 mb-2"><Video className="h-4 w-4" /> Vídeos (Links do YouTube/Vimeo)</Label>
            <Input
              id="newVideoLink"
              type="url"
              placeholder="Cole o link do YouTube, Vimeo..."
            />
            <Button type="button" disabled={isLoading} variant="secondary" className="w-full mt-2"
              onClick={() => toast.info("Funcionalidade de adicionar link de vídeo em desenvolvimento.")}
            >
              <Plus className="mr-2 h-4 w-4" /> Adicionar Link de Vídeo
            </Button>
            <div className="mt-4 space-y-2">
              {formData.portfolioVideos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-2 rounded-md bg-muted text-muted-foreground">
                  <span className="truncate">{video.name || video.url}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeMedia(video.id, 'portfolioVideos')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Contato e Preferências */}
        <TabsContent value="contact" className="space-y-6 mt-6">
          <h2 className="text-xl font-bold text-foreground">Contato e Disponibilidade</h2>

          <div>
            <Label htmlFor="contactPhone" className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-muted-foreground" /> Telefone de Contato
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="Ex: (XX) XXXXX-XXXX"
              value={formData.contactPhone}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.contactPhone ? 'border-destructive' : ''}
            />
            {errors.contactPhone && <p className="text-sm text-destructive mt-1">{errors.contactPhone}</p>}
          </div>

          <div>
            <Label htmlFor="contactEmail">E-mail de Contato (Opcional, se diferente do cadastro)</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="seu@email.com"
              value={formData.contactEmail}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.contactEmail ? 'border-destructive' : ''}
            />
            {errors.contactEmail && <p className="text-sm text-destructive mt-1">{errors.contactEmail}</p>}
          </div>

          <div>
            <Label htmlFor="priceRange">Faixa de Preço (por apresentação/evento, opcional)</Label>
            <Input
              id="priceRange"
              type="text"
              placeholder="Ex: R$ 500 - R$ 1500"
              value={formData.priceRange}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label>Disponibilidade (selecione)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 max-h-60 overflow-y-auto pr-2">
              {availabilityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`availability-${option}`}
                    checked={formData.availability.includes(option)}
                    onCheckedChange={(checked) => handleArrayChange(option, !!checked, 'availability')}
                    disabled={isLoading}
                  />
                  <Label htmlFor={`availability-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptsTravel"
              checked={formData.acceptsTravel}
              onCheckedChange={(checked) => handleSelectChange(String(checked), 'acceptsTravel')}
              disabled={isLoading}
            />
            <Label htmlFor="acceptsTravel">Aceito viajar para apresentações</Label>
          </div>
        </TabsContent>

        {/* Tab 5: Redes Sociais (Opcional) */}
        {/* Adicione esta aba se quiser um gerenciamento de links de redes sociais mais complexo */}
        <TabsContent value="social" className="space-y-6 mt-6">
          <h2 className="text-xl font-bold text-foreground">Links de Redes Sociais</h2>
          <p className="text-sm text-muted-foreground">Adicione links para seus perfis em plataformas como Instagram, YouTube, Facebook, etc.</p>
          {/* Exemplo de como adicionar/remover links de redes sociais.
                Isso geralmente requer um array de objetos no estado e botões para "Adicionar Link" */}
          <div className="space-y-4">
            {/* Aqui você iteraria sobre formData.socialMediaLinks */}
            {formData.socialMediaLinks.length === 0 && (
              <p className="text-muted-foreground">Nenhum link adicionado ainda.</p>
            )}
            {/* Exemplo de input para adicionar um novo link - você precisaria de mais lógica aqui */}
            <div>
              <Label htmlFor="newSocialLink">Novo Link de Rede Social</Label>
              <div className="flex gap-2 mt-1">
                <Input type="url" placeholder="Ex: https://instagram.com/seuperfil" id="newSocialLink" />
                <Button type="button" variant="secondary" disabled={isLoading}
                  onClick={() => toast.info("Funcionalidade de adicionar link social em desenvolvimento.")}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

      </Tabs>

      <Button type="submit" className="w-full mt-8" disabled={isLoading}>
        {isLoading ? 'Salvando Perfil...' : 'Salvar Perfil'}
      </Button>
    </form>
  );
}