// src/app/lib/stores/auth-flow-store.ts
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        accessToken: null,

        setSession: (authResponse) =>
          set({
            isAuthenticated: true,
            user: authResponse.user,
            accessToken: authResponse.accessToken,
          }),
        clearSession: () =>
          set({
            isAuthenticated: false,
            user: null,
            accessToken: null,
          }),
      }),
      {
        name: "auth-session", // Nome do storage
        storage: createJSONStorage(() => localStorage), // Usa localStorage para persistência
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          accessToken: state.accessToken,
        }), // Apenas persiste os campos necessários
      },
    ),
    {
      name: "AuthStore", // Nome do devtools
      anonymousActionType: "auth", // Ação anônima para devtools
    },
  ),
);
