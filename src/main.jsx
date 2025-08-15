import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <GoogleOAuthProvider clientId="700535868110-bqu6u812h19cqf397ubb56aut7inaqq6.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </HeroUIProvider>
  </StrictMode>
);

// 700535868110-bqu6u812h19cqf397ubb56aut7inaqq6.apps.googleusercontent.com
