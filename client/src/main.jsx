import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import * as chains from "@thirdweb-dev/chains";
import { StateContextProvider } from "./context";
const sepolia = chains["11155111"];

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Please check your HTML.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={chains.Sepolia}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
