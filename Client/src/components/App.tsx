// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Products, Register } from ".";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../state/store";

export function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
