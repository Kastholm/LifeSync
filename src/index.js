import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "react-tooltip/dist/react-tooltip.css";

//Routing
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthProvider";
import { VariableProvider } from "./components/context/VariableProvider.js";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <VariableProvider>
        <App />
      </VariableProvider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
