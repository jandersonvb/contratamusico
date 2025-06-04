// components/footer/Footer.tsx
'use client'; // Mantido para o Accordion, que possui interatividade.

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// NOTA: O subcomponente SocialLinks é incorporado aqui para concisão.
// Em projetos maiores, considere movê-lo para um arquivo separado.

interface SocialIconProps {
  href: string;
  icon: React.ElementType;
  name: string;
}

function SocialIcon({ href, icon: Icon, name }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
      aria-label={`Link para ${name}`}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();



  const resourcesLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Suporte', href: '/suporte' },
    { name: 'Termos de Uso', href: '/termos' },
    { name: 'Política de Privacidade', href: '/privacidade' },
  ];

  const socialMedia = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className="bg-background text-foreground py-12 md:py-16 clear-both border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e Descrição */}
          <div>

            <Link
              href="/"
              className="text-foreground text-2xl font-extrabold no-underline mb-2 flex items-center"
            >
              <span>Contrata</span>
              <span className="text-primary ml-1">Musico</span>
              <Image
                src="/logo.png"
                alt="Logo ContrataMusico"
                width={32}
                height={32}
                style={{ position: 'relative', top: '-4px', right: '4px' }}
              />
            </Link>
            <p className="text-muted-foreground text-sm">
              Conectando músicos e eventos com facilidade e profissionalismo.
            </p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Recursos
            </h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Conecte-se
            </h4>
            <div className="flex gap-3">
              {socialMedia.map((platform) => (
                <SocialIcon
                  key={platform.name}
                  href={platform.href}
                  icon={platform.icon}
                  name={platform.name}
                />
              ))}
            </div>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Contato
            </h4>
            <address className="not-italic text-muted-foreground text-sm space-y-2">
              <p>Avenida Padre Lourenço da Costa,3415</p>
              <p>Morro Grande, Itajubá - MG, Brasil</p>
              <p>CEP: 37502-710</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:jandersonvb.dev@gmail.com"
                  className="hover:text-primary transition-colors duration-300"
                >
                  jandersonvb.dev@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Direitos Autorais e Links Legais */}
        <div className="text-center text-muted-foreground text-sm mt-8">
          <p className="mb-2">
            © {currentYear} ContrataMusico. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/termos"
              className="hover:text-primary transition-colors duration-300"
            >
              Termos
            </Link>
            <Link
              href="/privacidade"
              className="hover:text-primary transition-colors duration-300"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}