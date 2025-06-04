import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";

export default function SobrePage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sobre Nós</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            ContrataMúsico é uma plataforma dedicada a conectar músicos e bandas,
            facilitando a busca pelo músico ideal para sua banda. Nossa missão é
            simplificar o processo de contratação, oferecendo uma interface intuitiva
            e recursos avançados de busca.
          </p>
          <p>
            Se você é um músico em busca de oportunidades ou uma banda procurando o
            próximo membro, estamos aqui para ajudar!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}