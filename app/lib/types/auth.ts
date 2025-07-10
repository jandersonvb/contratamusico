export type AccountType = "musico" | "contratante"; // Ou 'musician' | 'contractor' se você definiu assim no backend

// Payload que o frontend envia para o endpoint de cadastro
export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  accountType: AccountType;
}

export interface UserData {
  id: string;
  fullName: string;
  email: string;
  accountType: AccountType;
}

// Resposta esperada do backend para um login bem-sucedido
export interface AuthResponse {
  accessToken: string;
  user: UserData;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  accountType: AccountType;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  accessToken: string | null;
  setSession: (authResponse: { accessToken: string; user: UserData }) => void;
  clearSession: () => void;
}
