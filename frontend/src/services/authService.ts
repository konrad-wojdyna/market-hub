import type { RegisterData, LoginData } from "../types/auth";
import type { User } from "../types/user";
import { api } from "./api";

export interface AuthResponse {
  token: string;
  user: User;
  type: string;
}

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(`/auth/login`, data);
    return response.data;
  }

  async register(data: RegisterData): Promise<void> {
    await api.post<void>(`/auth/register`, data);
  }
}

export default new AuthService();
