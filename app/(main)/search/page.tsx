// app/(main)/search/page.tsx
import { SearchResults } from "@/app/components/SearchResults/SearchResults";
import { Suspense } from "react";

// Correção: Remova a tipagem explícita dos searchParams no parâmetro da função.
// O TypeScript do Next.js já infere a tipagem correta.
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string | string[] };
}) {
  // Alterei para string | string[] porque search params podem ser arrays
  // searchParams.q pode ser string ou string[] se houver múltiplos 'q' na URL.
  // Para simplificar, pegamos o primeiro valor se for array, ou a string se for singular.
  const queryValue = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q;
  const searchTerm = queryValue || "";

  return (
    <main className="bg-background text-foreground min-h-screen">
      {" "}
      {/* Usando as cores do tema */}
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-20">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Resultados da Busca para `{searchTerm}`
        </h1>
        {/* Usar Suspense para que o carregamento dos resultados não bloqueie o render da página */}
        <Suspense
          fallback={
            <div className="text-muted-foreground text-center">
              Carregando músicos...
            </div>
          }
        >
          {/* O componente SearchResults pode ser um Server Component ou Client Component que fará a chamada à API */}
          <SearchResults searchTerm={searchTerm} />
        </Suspense>
      </div>
    </main>
  );
}
