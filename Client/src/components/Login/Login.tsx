import Background from "../Background/Background";
import { loginParticles } from "../../utils/loginParticles";
import { TypeAnimation } from "react-type-animation";
import "./login.css";

function Login() {
    return (
        <div>
            <div className="container">
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        "MarketHub, for your favourite food",
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        "MarketHub, for your favourite clothes",
                        1500,
                        "MarketHub, for your favourite tech",
                        2000,
                        "MarketHub, for everything!",
                        3000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{
                        fontSize: "3em",
                        display: "inline-block",
                        color: "white",
                        fontStyle: "normal",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                    }}
                    repeat={Infinity}
                />
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
                        <button className="checkout-btn">
                            <a href="/api/sessions/register">Sign up</a>
                        </button>
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
