// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" />
            <Route path="/contact" />
        </Routes>
    );
}

export default App;
