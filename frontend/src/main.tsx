import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthProvider.tsx";
import AxiosInterceptor from "./services/AxiosInterceptor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
