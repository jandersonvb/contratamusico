import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">ContrataMúsico 🚀</h1>
      <p className="text-lg">A plataforma que conecta músicos e contratantes.</p>
      <p className="text-lg">Em breve, mais informações!</p>


      <Button asChild>
        <a
          href="https://wa.me/5535998102070"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-green-500 hover:bg-green-600"
        >
          Fale comigo no WhatsApp
        </a>
      </Button>
    </main >
  );
}
