import axios from "axios";
import { AUTH_TOKEN } from "../constants/auth";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);
