// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Home, Register, NavBar, ProductList, Profile } from ".";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../state/store";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </BrowserRouter>
        </Provider>
    );
}
