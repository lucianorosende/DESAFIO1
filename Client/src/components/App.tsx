// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Home, Register, NavBar, ProductList } from ".";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../state/store";

export function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<ProductList />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
