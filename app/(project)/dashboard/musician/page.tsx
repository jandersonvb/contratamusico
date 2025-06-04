// app/musicos/page.tsx
import Link from "next/link";

export default async function MusiciansPage() {
  // TODO: No futuro, aqui você fará a chamada à sua API NestJS para listar todos os músicos
  // const response = await fetch(`${process.env.API_URL}/musicos`);
  // const allMusicians = await response.json();

  // Exemplo de dados mock para testar
  const allMusicians = [
    { id: 1, name: "João Guitarrista", genre: "Rock", location: "São Paulo" },
    { id: 2, name: "Maria Baterista", genre: "Pop", location: "Rio de Janeiro" },
    { id: 3, name: "Pedro Vocalista", genre: "Jazz", location: "Belo Horizonte" },
    { id: 4, name: "Ana Tecladista", genre: "Samba", location: "Salvador" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-20">
        <h1 className="mb-8 text-3xl font-bold text-center">
          Todos os Músicos Cadastrados
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMusicians.map((musician) => (
            <div key={musician.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{musician.name}</h3>
              <p className="text-gray-700">Gênero: {musician.genre}</p>
              <p className="text-gray-700">Localização: {musician.location}</p>
              <Link href={`/musicos/${musician.id}`} className="mt-4 inline-block text-red-600 hover:underline">
                Ver perfil
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}