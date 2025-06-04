// app/search/page.tsx
import { SearchResults } from '@/app/components/SearchResults/SearchResults';
import { Suspense } from 'react'; // Para lidar com os search params de forma segura em RSC

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const searchTerm = searchParams.q || '';

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-20">
        <h1 className="mb-8 text-3xl font-bold text-center">
          Resultados da Busca para "{searchTerm}"
        </h1>
        {/* Usar Suspense para que o carregamento dos resultados não bloqueie o render da página */}
        <Suspense fallback={<div>Carregando músicos...</div>}>
          {/* O componente SearchResults será um Server Component ou Client Component que fará a chamada à API */}
          <SearchResults searchTerm={searchTerm} />
        </Suspense>
      </div>
    </main>
  );
}