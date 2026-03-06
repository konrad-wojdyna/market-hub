import { createContext } from "react";
import type { User } from "../types/user";
import type { LoginData } from "../types/auth";

export type AuthProps = {
  token: string | null;
  type: string;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthProps | null>(null);
