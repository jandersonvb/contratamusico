// src/app/api/auth.ts
import { SignupPayload, type AuthResponse } from "@/app/lib/types/auth"; // Importa os tipos

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

/**
 * Função de API para cadastrar um novo usuário.
 * @param payload Os dados de cadastro do usuário.
 * @returns Um objeto indicando sucesso e os dados do usuário, ou falha e mensagens de erro.
 */
export async function signupUserApi(
  payload: SignupPayload,
): Promise<AuthResponse> {
  const url = `${API_BASE_URL}/auth/signup`; // URL do endpoint de cadastro

  try {
    const response = await fetch(url, {
      // Endpoint de cadastro no backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = Array.isArray(errorData.message)
        ? errorData.message.join(", ")
        : errorData.message || "Erro ao cadastrar usuário.";
      throw new Error(errorMessage);
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição de signupUserApi:", error);
    throw new Error("Erro de rede ou conexão. Tente novamente.");
  }
}

/**
 * Função de API para autenticar um usuário (login).
 * @param email O email do usuário.
 * @param password A senha do usuário.
 * @returns Um objeto indicando sucesso e o accessToken, ou falha e mensagens de erro.
 */
export async function loginUserApi(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const url = `${API_BASE_URL}/auth/login`; // URL do endpoint de login

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = Array.isArray(errorData.message)
        ? errorData.message.join(", ")
        : errorData.message || "Erro ao fazer login.";
      throw new Error(errorMessage);
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição de loginUserApi:", error);
    throw new Error("Erro de rede ou conexão. Tente novamente.");
  }
}
