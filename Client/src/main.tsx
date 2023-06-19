import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
// import io from "socket.io-client";
import "../styles.css";
import { BrowserRouter } from "react-router-dom";

// export const socket = io("http://localhost:8080/");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
