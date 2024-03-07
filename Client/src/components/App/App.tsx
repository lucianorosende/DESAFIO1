// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "..";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/contact" />
        </Routes>
    );
}

export default App;
