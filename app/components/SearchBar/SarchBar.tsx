// app/_components/SearchBar.tsx
"use client"; // Marca como Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Search } from "lucide-react"; // Importe o ícone Search

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Redireciona para a página de busca com o termo na query param
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // Se a busca estiver vazia, talvez redirecionar para a página de todos os músicos
      router.push("/musicos");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
      <div className="relative flex-1 w-full md:w-auto">
        <Input
          type="text"
          placeholder="Buscar músicos"
          className="flex-1 border-gray-300 pr-10" // Adiciona padding para o ícone
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Buscar músicos" // Melhoria de acessibilidade
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
      <Button onClick={handleSearch} variant="default" >
        Buscar músicos
      </Button>
    </div>
  );
}