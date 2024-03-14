import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "../index";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
