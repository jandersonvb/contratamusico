"use client"; // Necessário para useState, DropdownMenu, Sheet e next-auth/react

import Link from "next/link";
import Image from "next/image"; // Para a logo
import { Button } from "@/app/_components/ui/button"; // Shadcn Button
import { signOut } from "next-auth/react"; // Para NextAuth
import { Session } from "next-auth"; // Import Session from next-auth
import {
  Home,
  Mail,
  DollarSign,
  Bell,
  User,
  Menu,
  X,
  Search,
  Briefcase,
  PlusCircle,
  LogIn,
  UserPlus,
  LogOut,
  type LucideProps,
} from "lucide-react"; // Ícones Lucide
import { useState, useMemo, type ComponentType } from "react"; // React Hooks
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"; // Shadcn DropdownMenu
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet"; // Shadcn Sheet
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar"; // Shadcn Avatar
import { Badge } from "@/app/_components/ui/badge";
import { SearchBar } from "../SearchBar/SarchBar";

// --- Interfaces e Tipos (podem vir de um arquivo de tipos global) ---
// Certifique-se de que esta tipagem está disponível globalmente no seu projeto (e.g., types/next-auth.d.ts)
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id?: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role?: 'musician' | 'contractor' | 'admin' | null;
//     } & DefaultSession["user"];
//   }
// }

type UserRole = "musician" | "contractor" | "admin" | null;

interface NavLink {
  href: string;
  label: string;
  icon?: ComponentType<LucideProps>;
  showIn: "desktop-nav" | "mobile-sheet" | "dropdown" | "action-button";
  roles?: UserRole[];
  authRequired?: boolean;
}

// --- Funções Auxiliares ---
const getInitials = (
  name: string | null | undefined,
  email: string | null | undefined,
) => {
  if (name) {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0]?.[0]?.toUpperCase() || "?"; // Adicionado verificação de existência para parts[0]
  }
  if (email) {
    return email[0]?.toUpperCase() || "?";
  }
  return "?";
};

// --- Dados dos Links (Centralizados) ---
const navLinks: NavLink[] = [
  // Links Gerais
  {
    href: "/",
    label: "Home",
    icon: Home,
    showIn: "desktop-nav",
    authRequired: false,
  },
  {
    href: "/contato",
    label: "Contato",
    icon: Mail,
    showIn: "desktop-nav",
    authRequired: false,
  }, // Contato também no desktop
  {
    href: "/planos",
    label: "Planos",
    icon: DollarSign,
    showIn: "desktop-nav",
    authRequired: false,
  }, // Planos também no desktop

  // Ações de Botão (Desktop, para users logados)
  {
    href: "/pesquisar",
    label: "Pesquisar",
    icon: Search,
    showIn: "action-button",
    authRequired: true,
  },
  {
    href: "/dashboard/create",
    label: "Publicar",
    icon: PlusCircle,
    showIn: "action-button",
    authRequired: true,
  },
  {
    href: "/dashboard/musician/profile/create",
    label: "Criar Perfil",
    icon: UserPlus,
    showIn: "action-button",
    authRequired: true,
  },

  // Links para Guest (Não Logado) - Ações e Mobile Sheet
  {
    href: "/signup",
    label: "Cadastre-se",
    icon: UserPlus,
    showIn: "desktop-nav",
    authRequired: false,
  }, // Botão desktop Cadastre-se
  {
    href: "/login",
    label: "Entrar",
    icon: LogIn,
    showIn: "desktop-nav",
    authRequired: false,
  }, // Botão desktop Entrar

  // Links Comuns para Usuários Logados (aparecem no mobile sheet e dropdown)
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
    showIn: "mobile-sheet",
    authRequired: true,
  },
  {
    href: "/dashboard/notifications",
    label: "Notificações",
    icon: Bell,
    showIn: "mobile-sheet",
    authRequired: true,
  },

  // Links para Músicos (mobile sheet e dropdown)
  {
    href: "#",
    label: "Meu Perfil",
    icon: User,
    showIn: "dropdown",
    roles: ["musician"],
    authRequired: true,
  },
  {
    href: "#",
    label: "Portfólio",
    icon: Briefcase,
    showIn: "dropdown",
    roles: ["musician"],
    authRequired: true,
  },
  {
    href: "#",
    label: "Minhas Propostas",
    icon: Bell,
    showIn: "dropdown",
    roles: ["musician"],
    authRequired: true,
  },
  {
    href: "#",
    label: "Meu Perfil",
    icon: User,
    showIn: "mobile-sheet",
    roles: ["musician"],
    authRequired: true,
  }, // Também no mobile sheet
  {
    href: "#",
    label: "Portfólio",
    icon: Briefcase,
    showIn: "mobile-sheet",
    roles: ["musician"],
    authRequired: true,
  }, // Também no mobile sheet
  {
    href: "#",
    label: "Minhas Propostas",
    icon: Bell,
    showIn: "mobile-sheet",
    roles: ["musician"],
    authRequired: true,
  }, // Também no mobile sheet

  // Links para Contratantes (mobile sheet e dropdown)
  {
    href: "/musicos",
    label: "Buscar Músicos",
    icon: Search,
    showIn: "dropdown",
    roles: ["contractor"],
    authRequired: true,
  },
  {
    href: "/dashboard/contractor/my-proposals",
    label: "Minhas Contratações",
    icon: Briefcase,
    showIn: "dropdown",
    roles: ["contractor"],
    authRequired: true,
  },
  {
    href: "/musicos",
    label: "Buscar Músicos",
    icon: Search,
    showIn: "mobile-sheet",
    roles: ["contractor"],
    authRequired: true,
  }, // Também no mobile sheet
  {
    href: "/dashboard/contractor/my-proposals",
    label: "Minhas Contratações",
    icon: Briefcase,
    showIn: "mobile-sheet",
    roles: ["contractor"],
    authRequired: true,
  }, // Também no mobile sheet
];

// --- Subcomponentes ---

interface HeaderNavLinkProps {
  link: NavLink;
  onLinkClick?: () => void;
  className?: string;
  variant?:
  | "default"
  | "outline"
  | "ghost"
  | "link"
  | "secondary"
  | "destructive"
  | null; // Null para links padrão
}

function HeaderNavLink({
  link,
  onLinkClick,
  className,
  variant,
}: HeaderNavLinkProps) {
  const isButton =
    link.showIn === "desktop-nav" &&
    (link.label === "Entrar" || link.label === "Cadastre-se");
  const ButtonIcon = link.icon;

  if (isButton) {
    return (
      <Link href={link.href} onClick={onLinkClick}>
        <Button variant={variant || "default"} className={className}>
          {ButtonIcon && <ButtonIcon className="h-4 w-4" />}
          {link.label}
        </Button>
      </Link>
    );
  }

  // Para links de navegação ou dropdown
  return (
    <Link
      href={link.href}
      className={`flex items-center gap-2 ${className || "hover:text-primary text-gray-700 transition-colors duration-200"}`}
      onClick={onLinkClick}
    >
      {link.icon && <link.icon className="ml-4 h-4 w-4" />}{" "}
      {/* Ícone à esquerda do texto */}
      {link.label}
    </Link>
  );
}

interface UserProfileSectionProps {
  session: Session;
  userRole: UserRole;
  getInitials: (
    name: string | null | undefined,
    email: string | null | undefined,
  ) => string;
  onSignOut: () => void;
}

function UserProfileSection({
  session,
  userRole,
  getInitials,
  onSignOut,
}: UserProfileSectionProps) {
  const dropdownLinks = useMemo(() => {
    return navLinks.filter(
      (link) =>
        link.showIn === "dropdown" &&
        link.authRequired &&
        (!link.roles || (userRole && link.roles.includes(userRole))),
    );
  }, [userRole]);

  return (
    <div className="flex items-center gap-4">
      {/* Botões de Ação para logados (Pesquisar, Publicar) - visíveis apenas em desktop */}
      <div className="hidden items-center gap-2 md:flex">
        <SearchBar />

        <HeaderNavLink
          link={
            navLinks.find(
              (l) => l.label === "Criar Perfil" && l.showIn === "action-button",
            )!
          }
          variant="secondary"
        />
      </div>

      {/* Ícone de Notificações - Visível apenas em desktop */}
      <Link
        href="#"
        className="relative hidden rounded-full p-2 transition-colors hover:bg-gray-100 md:block"
      >
        <Bell className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-1 -right-1">
          <Badge
            variant="destructive"
            className="flex h-5 w-5 items-center justify-center text-xs"
          >
            3
          </Badge>
        </span>
      </Link>

      {/* Dropdown do Perfil - Visível apenas em desktop */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 overflow-hidden rounded-full"
          >
            <Avatar>
              {session.user?.image && // Verifica se a propriedade 'image' existe
                typeof session.user.image === 'object' && // ADICIONADO: Verifica se é um OBJETO
                (session.user.image as { url?: string }).url && // ADICIONADO: Verifica se tem a propriedade 'url'
                typeof (session.user.image as { url: string }).url === 'string' && // ADICIONADO: Verifica se 'url' é string
                (session.user.image as { url: string }).url.startsWith("http") ? ( // Agora, chama startsWith na URL
                <AvatarImage src={(session.user.image as { url: string }).url} alt="Avatar do Usuário" /> // USA session.user.image.url
              ) : (
                <AvatarFallback className="bg-gray-200 text-sm font-semibold text-gray-600">
                  {getInitials(session.user?.name, session.user?.email)}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 max-h-96 w-64" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">
                {session.user?.name || "Usuário"}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dropdownLinks.map((link) => (
            <DropdownMenuItem key={link.href} asChild>
              <HeaderNavLink
                link={link}
                className="hover:text-primary text-gray-700 transition-colors duration-200"
              />
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onSignOut}
            className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// --- Componente Principal Header ---
export function Header({
  session,
  userRole,
}: {
  session: Session | null;
  userRole: UserRole;
}) {

  console.log("DEBUG Header: Session data:", session);
  console.log("DEBUG Header: User data:", session?.user);
  console.log("DEBUG Header: User Image:", session?.user?.image);
  console.log("DEBUG Header: Type of User Image:", typeof session?.user?.image);
  console.log("DEBUG Header: Image starts with http?", session?.user?.image && typeof session.user.image === 'string' ? session.user.image.startsWith("http") : "Not a string or missing");

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    setIsSheetOpen(false); // Fecha o sheet ao sair
  };

  // Filtragem de links para Desktop Navigation
  const desktopNavLinksFiltered = useMemo(() => {
    return navLinks.filter(
      (link) =>
        link.showIn === "desktop-nav" &&
        ((link.authRequired && session) || (!link.authRequired && !session)), // Exibir se precisa de auth e está logado OU não precisa e não está logado
    );
  }, [session]);

  // Filtragem de links para Mobile Sheet
  const mobileSheetLinksFiltered = useMemo(() => {
    return navLinks.filter(
      (link) =>
        link.showIn === "mobile-sheet" &&
        ((link.authRequired && session) || (!link.authRequired && !session)) && // Exibir se precisa de auth e está logado OU não precisa e não está logado
        (!link.roles || (session && userRole && link.roles.includes(userRole))), // Inclui links específicos de role
    );
  }, [session, userRole]);

  return (
    <header className="bg-background border-border sticky top-0 z-50 border-b py-4 shadow-sm">
      {" "}
      {/* sticky e z-50 para fixar */}
      {/* Container para alinhar a largura com o Footer */}
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          href={session ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          {/* Logo/Nome do Projeto replicando o estilo do Footer */}
          <span className="text-foreground flex items-center text-2xl font-extrabold no-underline">
            <span>Contrata</span>
            <span className="text-primary ml-1">Musico</span>
            <Image
              src="/logo.png" // Certifique-se de ter um arquivo logo.png na pasta public
              alt="Logo ContrataMusico"
              width={32}
              height={32}
              style={{ position: "relative", top: "-4px", right: "4px" }}
            />
          </span>
        </Link>

        {/* Navegação Desktop (alinhada à direita) */}
        <nav className="hidden flex-grow items-center justify-end gap-4 md:flex">
          {" "}
          {/* Alinha à direita */}
          {desktopNavLinksFiltered.map((link) => (
            <HeaderNavLink
              key={link.href}
              link={link}
              // Aqui definimos as variantes para os botões "Entrar" e "Cadastre-se" no desktop
              variant={
                link.label === "Cadastre-se"
                  ? "default"
                  : link.label === "Entrar"
                    ? "outline"
                    : null
              }
              className={
                link.label === "Entrar"
                  ? "border-primary text-primary hover:bg-primary border-2 hover:text-white"
                  : ""
              }
            />
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {session ? (
            <UserProfileSection
              session={session}
              userRole={userRole}
              getInitials={getInitials}
              onSignOut={handleSignOut}
            />
          ) : // Botões de login/cadastro para deslogados (Desktop, já tratados na nav)
            null}

          {/* Menu Hamburguer para Mobile (abre o Sheet) */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                aria-label={isSheetOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isSheetOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex w-[280px] flex-col sm:w-[350px]"
            >
              <SheetHeader>
                <SheetTitle className="text-primary text-2xl font-bold">
                  Bem-vindo
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  Seja bem ao ContrataMusico, cadastre-se ou faça login para
                  acessar todos os recursos.
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-6 flex flex-grow flex-col gap-4">
                {/* Navegação geral para todos os usuários */}
                {navLinks
                  .filter((link) =>
                    ["Home", "Contato", "Planos"].includes(link.label),
                  )
                  .map((link) => (
                    <HeaderNavLink
                      key={link.href}
                      link={link}
                      onLinkClick={() => setIsSheetOpen(false)}
                    />
                  ))}

                {session ? (
                  <>
                    {/* Informações do usuário logado no Sheet */}
                    <div className="bg-muted mb-4 flex items-center gap-3 rounded-md p-2">
                      <Avatar>
                        {session.user?.image && // Verifica se a propriedade 'image' existe
                          typeof session.user.image === 'object' && // ADICIONADO: Verifica se é um OBJETO
                          (session.user.image as { url?: string }).url && // ADICIONADO: Verifica se tem a propriedade 'url'
                          typeof (session.user.image as { url: string }).url === 'string' && // ADICIONADO: Verifica se 'url' é string
                          (session.user.image as { url: string }).url.startsWith("http") ? ( // Agora, chama startsWith na URL
                          <AvatarImage src={(session.user.image as { url: string }).url} alt="Avatar do Usuário" /> // USA session.user.image.url
                        ) : (
                          <AvatarFallback className="bg-gray-200 text-sm font-semibold text-gray-600">
                            {getInitials(session.user?.name, session.user?.email)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="text-lg font-semibold">
                          {session.user?.name || "Usuário"}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-foreground mb-2 font-semibold">
                      Geral
                    </h3>
                    {/* Links que devem aparecer no mobile sheet para usuários logados */}
                    {mobileSheetLinksFiltered
                      .filter(
                        (link) =>
                          link.authRequired &&
                          (!link.roles ||
                            (userRole && link.roles.includes(userRole))),
                      )
                      .map((link) => (
                        <HeaderNavLink
                          key={link.href}
                          link={link}
                          onLinkClick={() => setIsSheetOpen(false)}
                        />
                      ))}

                    {/* Botões de ação no mobile sheet para logados */}
                    <div className="border-border mt-auto border-t pt-6">
                      <HeaderNavLink
                        link={
                          navLinks.find(
                            (l) =>
                              l.label === "Pesquisar" &&
                              l.showIn === "action-button",
                          )!
                        }
                        onLinkClick={() => setIsSheetOpen(false)}
                        className="mb-2 w-full justify-start"
                        variant="outline"
                      />
                      <HeaderNavLink
                        link={
                          navLinks.find(
                            (l) =>
                              l.label === "Publicar" &&
                              l.showIn === "action-button",
                          )!
                        }
                        onLinkClick={() => setIsSheetOpen(false)}
                        className="w-full justify-start"
                        variant="default"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Links para usuário deslogado no Sheet */}
                    {mobileSheetLinksFiltered
                      .filter((link) => !link.authRequired) // Filtra apenas links para deslogados
                      .map((link) => (
                        <HeaderNavLink
                          key={link.href}
                          link={link}
                          onLinkClick={() => setIsSheetOpen(false)}
                        />
                      ))}

                    {/* Botões de cadastro e login para deslogados */}
                    <div className="border-border border-t p-4">
                      <HeaderNavLink
                        link={
                          navLinks.find(
                            (l) =>
                              l.label === "Cadastre-se" &&
                              l.showIn === "desktop-nav",
                          )!
                        }
                        onLinkClick={() => setIsSheetOpen(false)}
                        className="mb-2 w-full justify-start"
                        variant="default"
                      />
                      <HeaderNavLink
                        link={
                          navLinks.find(
                            (l) =>
                              l.label === "Entrar" &&
                              l.showIn === "desktop-nav",
                          )!
                        }
                        onLinkClick={() => setIsSheetOpen(false)}
                        className="w-full justify-start"
                        variant="outline"
                      />
                    </div>
                  </>
                )}
              </nav>
              {session && (
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 mt-6 w-full justify-start" // Use destructive variant para sair
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
