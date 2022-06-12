import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider, NotesProvider } from "./context/";
import { ModalProvider } from "./context/modal-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ModalProvider>
          <NotesProvider>
            <App />
          </NotesProvider>
        </ModalProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
