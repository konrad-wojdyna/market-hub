import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./api";
import { AUTH_TOKEN, AUTH_USER_KEY } from "../constants/auth";

type Props = { children: ReactNode };

const AxiosInterceptor = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(AUTH_TOKEN);
          localStorage.removeItem(AUTH_USER_KEY);
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(responseInterceptor);
  }, [navigate]);

  return children;
};

export default AxiosInterceptor;
