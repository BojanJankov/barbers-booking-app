import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";
import { BarberProvider } from "./context/StateContext.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BarberProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BarberProvider>
    </AuthProvider>
  </StrictMode>
);
