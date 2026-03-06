import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthProps } from "./AuthContext";
import type { User } from "../types/user";
import authService from "../services/authService";
import type { LoginData } from "../types/auth";
import { AUTH_TOKEN, AUTH_USER_KEY } from "../constants/auth";

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const login = async (data: LoginData) => {
    setIsLoading(true);

    try {
      const response = await authService.login(data);
      const token = response.token;
      const user = response.user;
      setToken(token);
      setUser(user);
      saveTokenToLocalStorage(AUTH_TOKEN, token);
      saveUserToLocalStorage(AUTH_USER_KEY, user);
    } catch (error) {
      console.error("Błąd logowania:", error);
      throw error; // Wyrzucamy błąd, aby komponent (np. formularz) mógł go obsłużyć
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserToLocalStorage = (key: string, user: User) => {
    localStorage.setItem(key, JSON.stringify(user));
  };

  const saveTokenToLocalStorage = (key: string, token: string) => {
    localStorage.setItem(key, token);
  };

  const removeUserAndTokenFromLocalStorage = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
  };

  const contextValue: AuthProps = {
    token,
    type: "Bearer",
    user,
    isAuthenticated: !!token,
    isLoading,
    isInitialized,
    login,
    logout: removeUserAndTokenFromLocalStorage,
  };

  useEffect(() => {
    try {
      const token = getToken();
      const userFromLocalStorage = localStorage.getItem(AUTH_USER_KEY);
      const user = userFromLocalStorage
        ? JSON.parse(userFromLocalStorage)
        : null;

      setToken(token);

      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.error("Something went wrong." + error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
