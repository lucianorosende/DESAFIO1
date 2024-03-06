import "./login.css";

function Login() {
    return (
        <div className="container">
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
        </div>
    );
}

export default Login;
