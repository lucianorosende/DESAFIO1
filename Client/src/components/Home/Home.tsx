import { Link } from "react-router-dom";
import "./home.css";
function Home() {
    return (
        <div className="container">
            <div className="">
                <h2 className="">Home</h2>
                <div>
                    <button type="submit">
                        <Link to="/login">Go to login</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
