// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Products, Register } from ".";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
        </Routes>
    );
}
