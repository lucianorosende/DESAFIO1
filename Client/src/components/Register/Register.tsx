import { Background } from "..";
import { registerParticles } from "../../utils";
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="containerRegister container">
            <h2>Register</h2>
            <form action="/api/sessions/register" method="POST">
                <div className="form-group">
                    <label htmlFor="firstName" className="signupColor">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="signupColor">
                        Last Name
                    </label>
                    <input type="text" id="lastName" name="lastName" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="signupColor">
                        Email
                    </label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="Age" className="signupColor">
                        Age
                    </label>
                    <input type="text" id="Age" name="Age" required />
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
                    <Link to="/">
                        <button className="add-to-cart-button">
                            Go back to Login
                        </button>
                    </Link>
                </div>
                <div className="form-group">
                    <button className="checkout-btn">Sign in</button>
                </div>
            </form>
            <Background options={registerParticles} />
        </div>
    );
}

export default Register;
