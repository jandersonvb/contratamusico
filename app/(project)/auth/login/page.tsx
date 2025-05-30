import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { handleAuth } from "@/app/actions/handle-auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default async function LoginPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Acesse sua conta ContrataMusico</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <div className="flex items-center px-6 py-4">
          <div className="mx-2 flex-grow border-t border-gray-300"></div>
          <span className="text-sm text-gray-500">ou</span>
          <div className="mx-2 flex-grow border-t border-gray-300"></div>
        </div>
        <CardContent>
          <form action={handleAuth}>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
              type="submit"
            >
              <FcGoogle size={20} />
              Continuar com Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Entrar</Button>
          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/auth/signup" className="underline">
              Cadastre-se
            </Link>
          </div>
          <div className="text-center text-sm">
            <Link href="/auth/forgot-password" className="underline">
              Esqueceu sua senha?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
