import { auth } from "@/app/lib/auth";
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
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="text-center">
          <p className="text-lg">Bem-vindo, {userEmail || "User"}!</p>
          <div className="mt-4">
            <p className="text-gray-500">
              Em breve novas funcionalidades estarão no ar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
