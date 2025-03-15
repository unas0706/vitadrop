import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import { DonorContextProvider } from "./context/DonorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <DonorContextProvider>
        <App />
      </DonorContextProvider>
    </UserContextProvider>
  </StrictMode>
);
