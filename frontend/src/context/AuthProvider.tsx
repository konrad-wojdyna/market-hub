import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthProps } from "./AuthContext";
import type { User } from "../types/user";
import authService from "../services/authService";
import type { LoginData } from "../types/auth";

type Props = { children: ReactNode };

const auth_token = "TOKEN_KEY";
const auth_user = "USER_KEY";

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
      saveTokenToLocalStorage(auth_token, token);
      saveUserToLocalStorage(auth_user, user);
    } catch (error) {
      console.error("Błąd logowania:", error);
      throw error; // Wyrzucamy błąd, aby komponent (np. formularz) mógł go obsłużyć
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeUserAndTokenFromLocalStorage(auth_token, auth_user);
  };

  const saveUserToLocalStorage = (key: string, user: User) => {
    localStorage.setItem(key, JSON.stringify(user));
  };

  const saveTokenToLocalStorage = (key: string, token: string) => {
    localStorage.setItem(key, token);
  };

  const removeUserAndTokenFromLocalStorage = (
    tokenKey: string,
    userKey: string,
  ) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
  };

  const contextValue: AuthProps = {
    token,
    type: "Bearer",
    user,
    isAuthenticated: !!token,
    isLoading,
    isInitialized,
    login,
    logout,
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem(auth_token);
      const userFromLocalStorage = localStorage.getItem(auth_user);
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
