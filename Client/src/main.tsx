import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import io from "socket.io-client";
import "../styles.css";

export const socket = io("http://localhost:8080/");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
