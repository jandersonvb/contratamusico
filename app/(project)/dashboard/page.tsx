import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/login"); // Redirect to the login page if the user is not logged in
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-between border-b px-4 py-4 backdrop-blur md:px-6">
        <Link
          href="#"
          className="flex items-center gap-1 text-lg font-bold text-white md:text-xl"
        >
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="text-white">ContrataMúsico</span>
        </Link>
        <UserButton />
      </div>

      <div className="flex-1 p-4"></div>
    </div>
  );
}
