// // app/onboarding/select-role/page.tsx
// "use client";
// import { Button } from "@/app/_components/ui/button";
// import { updateUserRole } from "@/app/actions/user-actions";
// import { useRouter } from "next/navigation"; // Importar useRouter

// export default function SelectRolePage() {
//     const router = useRouter();

//     const handleRoleSelection = async (role: 'musician' | 'contractor') => {
//         try {
//             const result = await updateUserRole(role); // Chamar a Server Action
//             if (result.success) {
//                 // Se a atualização foi um sucesso, redirecionar no CLIENTE
//                 router.push("/dashboard");
//             } else {
//                 // Lidar com o erro retornado pela Server Action
//                 alert(result.error); // Exibir a mensagem de erro para o usuário
//             }
//         } catch (error) {
//             console.error("Erro inesperado ao selecionar role:", error);
//             alert("Ocorreu um erro inesperado. Tente novamente.");
//         }
//     };

//     return (
//         <main className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <div className="bg-white p-8 rounded-lg shadow-md text-center">
//                 <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Contratamusico!</h1>
//                 <p className="mb-6 text-gray-600">Para começar, por favor, selecione seu papel na plataforma:</p>
//                 <div className="flex flex-col gap-4">
//                     <Button onClick={() => handleRoleSelection('musician')} variant="default">
//                         Sou Músico
//                     </Button>
//                     <Button onClick={() => handleRoleSelection('contractor')} variant="secondary">
//                         Sou Contratante
//                     </Button>
//                 </div>
//             </div>
//         </main>
//     );
// }
