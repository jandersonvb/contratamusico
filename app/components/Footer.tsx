import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-6 py-8 text-sm text-gray-600 md:flex-row">
        <div className="mb-4 space-x-4 md:mb-0">
          <Link href="/sobre" className="hover:text-primary">
            Sobre
          </Link>
          <Link href="/contato" className="hover:text-primary">
            Contato
          </Link>
          <Link href="#" className="hover:text-primary">
            Termos de Uso
          </Link>
          <Link href="#" className="hover:text-primary">
            Política de Privacidade
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            href="#"
            className="hover:text-primary transition"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition"
            aria-label="Linkedin"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
        <p>
          © {new Date().getFullYear()} ContrataMúsico. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
