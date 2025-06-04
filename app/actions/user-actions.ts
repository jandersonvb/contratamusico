// app/actions/user-actions.ts
"use server";
import { db } from "@/app/lib/firebase";
import { auth } from "@/app/lib/auth";
// import { redirect } from "next/navigation"; // REMOVA ESTE IMPORT

export async function updateUserRole(role: 'musician' | 'contractor') {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado.");
  }

  try {
    await db.collection('users').doc(session.user.id).update({
      role: role,
      updatedAt: new Date(),
    });
    console.log(`Role do usuário ${session.user.id} atualizada para ${role}`);
    return { success: true }; // Retorna um objeto indicando sucesso
  } catch (error) {
    console.error("Erro ao atualizar role do usuário no Firestore:", error);
    return { success: false, error: "Falha ao definir o papel." }; // Retorna erro
  }
}