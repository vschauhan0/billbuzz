import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import { SidebarProvider } from "./components/contexts/SidebarContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SidebarProvider>

    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    </SidebarProvider>
  </StrictMode>
);
