import { Link } from "react-router-dom";
import { loginParticles, loginSequence } from "../../utils";
import { Background, TextAnimation } from "../index";
import "./login.css";

function Login() {
    return (
        <div>
            <div className="container">
                <TextAnimation sequence={loginSequence} />
                <form action="/api/sessions/login" method="POST">
                    <div className="form-group">
                        <label htmlFor="Email" className="signupColor">
                            Email
                        </label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="signupColor">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="add-to-cart-button">
                            Login
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="add-to-cart-button">
                            <a href="/api/sessions/github">Login with Github</a>
                        </button>
                    </div>
                    <div className="form-group">
                        <Link to="/register">
                            <button className="checkout-btn">Sign Up</button>
                        </Link>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="delete">
                            <a href="/views/recover-pass">Forgot Password?</a>
                        </button>
                    </div>
                </form>
                <Background options={loginParticles} />
            </div>
        </div>
    );
}

export default Login;
