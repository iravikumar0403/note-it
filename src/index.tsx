import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider, NotesProvider } from "./context/";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
