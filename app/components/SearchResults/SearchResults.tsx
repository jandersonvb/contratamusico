// app/search/_components/SearchResults.tsx
// Este pode ser um Server Component (se buscar dados no servidor) ou Client Component.
// Para fins de exemplo, vamos fazê-lo como Server Component por enquanto.

import Link from "next/link";

interface SearchResultsProps {
  searchTerm: string;
}

export async function SearchResults({ searchTerm }: SearchResultsProps) {
  // TODO: No futuro, aqui você fará a chamada à sua API NestJS:
  // const response = await fetch(`${process.env.API_URL}/musicos/search?q=${encodeURIComponent(searchTerm)}`);
  // const musicians = await response.json();

  // Exemplo de dados mock para testar
  const mockMusicians = [
    { id: 1, name: "João Guitarrista", genre: "Rock", location: "São Paulo" },
    { id: 2, name: "Maria Baterista", genre: "Pop", location: "Rio de Janeiro" },
    { id: 3, name: "Pedro Vocalista", genre: "Jazz", location: "Belo Horizonte" },
  ].filter(musician =>
    musician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    musician.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (mockMusicians.length === 0) {
    return (
      <p className="text-center text-gray-600">Nenhum músico encontrado para a busca "{searchTerm}".</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockMusicians.map((musician) => (
        <div key={musician.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{musician.name}</h3>
          <p className="text-gray-700">Gênero: {musician.genre}</p>
          <p className="text-gray-700">Localização: {musician.location}</p>
          {/* Adicionar um link para o perfil do músico */}
          <Link href={`/musicos/${musician.id}`} className="mt-4 inline-block text-red-600 hover:underline">
            Ver perfil
          </Link>
        </div>
      ))}
    </div>
  );
}