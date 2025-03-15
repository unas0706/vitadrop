import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BloodBankContextProvider } from "./context/BloodBankContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BloodBankContextProvider>
      <App />
    </BloodBankContextProvider>
  </React.StrictMode>
);

reportWebVitals();
