import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./auth/AuthContext";
import { ChatContextProvider } from "./auth/ChatContext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
