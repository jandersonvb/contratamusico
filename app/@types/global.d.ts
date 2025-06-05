// app/@types/global.d.ts
// Este arquivo tenta redefinir a interface LayoutProps globalmente
// para garantir que a propriedade 'types' seja opcional.

import { type ReactNode } from "react";

// Declaração de interface global para LayoutProps
// Isso pode sobrescrever definições de LayoutProps de outros lugares.
declare global {
  interface LayoutProps {
    children: ReactNode;
    params?: Record<string, string | string[] | undefined>;
    searchParams?: Record<string, string | string[] | undefined>;
    // Torna 'types' opcional. Se ele for um tipo específico e não string[], ajuste aqui.
    types?: string[]; // Ou use `unknown;` se `string[]` ainda causar erro de tipo
  }
}

// Se a interface LayoutProps estiver vindo especificamente do módulo 'next',
// a declaração 'declare module "next"' ainda é a mais correta.
// Mantenha app/@types/layout-props.d.ts como está também, pois a combinação pode ser necessária.
