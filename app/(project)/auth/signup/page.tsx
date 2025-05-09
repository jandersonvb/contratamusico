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
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Cadastro</CardTitle>
          <CardDescription>Crie sua conta no ContrataMusico</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" placeholder="Seu nome" required />
          </div>
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
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirmar Senha</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label>Tipo de Conta</Label>
            <RadioGroup defaultValue="contractor" className="flex gap-4 pt-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contractor" id="r1" />
                <Label htmlFor="r1">Quero Contratar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="musician" id="r2" />
                <Label htmlFor="r2">Sou Músico</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Criar Conta</Button>
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="underline">
              Faça Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
