
import { handleAuth } from "@/app/actions/handle-auth";
import Image from "next/image";

import { Button } from "@/app/_components/ui/button";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth(); // Get the session data from the auth function

  const userId = session?.user?.id; // Extract the user ID or email from the session
  const userEmail = session?.user?.email; // Extract the user email from the session
  console.log("User ID:", userId);
  console.log("User Email:", userEmail);

  if (!session) {
    redirect("/auth/login");
  }


  return (
    <div className="flex h-screen flex-col">
      <div className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-between border-b px-4 py-4 backdrop-blur md:px-6">
        <Link
          href="/"
          className="flex items-center gap-1 text-lg font-bold text-white md:text-xl"
        >
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="text-white">ContrataMúsico</span>
        </Link>

        <div className="flex items-center gap-4">
          {session?.user?.email && (
            <form action={handleAuth}>
              <Button type="submit">
                Logout
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="flex-1 p-4"></div>
    </div>
  );
}
