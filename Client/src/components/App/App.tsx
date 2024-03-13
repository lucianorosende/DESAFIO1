// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "..";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
