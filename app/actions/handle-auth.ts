"use server";

import { auth, signIn, signOut } from "@/app/lib/auth";

export async function handleAuth() {
  const session = await auth();

  if (session) {
    return await signOut({
      redirect: true
    });
  }

  await signIn("google", {
    redirectTo: "/dashboard"
  });

}