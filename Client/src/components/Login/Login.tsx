import "./login.css";
import Particles from "react-tsparticles";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";

function Login() {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        // await loadFull(engine);
        await loadSlim(engine);
    }, []);
    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {
            await console.log(container);
        },
        []
    );
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
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    particles: {
                        number: {
                            value: 80,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        color: {
                            value: "#ffffff",
                        },
                        shape: {
                            type: "circle",
                            stroke: {
                                width: 0,
                                color: "#000000",
                            },
                            polygon: {
                                nb_sides: 5,
                            },
                            image: {
                                src: "img/github.svg",
                                width: 100,
                                height: 100,
                            },
                        },
                        opacity: {
                            value: 1,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false,
                            },
                        },
                        size: {
                            value: 3.945738208161363,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 40,
                                size_min: 0.1,
                                sync: false,
                            },
                        },
                        line_linked: {
                            enable: false,
                            distance: 150,
                            color: "#ffffff",
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 6,
                            direction: "none",
                            random: false,
                            straight: false,
                            out_mode: "out",
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200,
                            },
                        },
                    },

                    retina_detect: true,
                }}
            />
        </div>
    );
}

export default Login;
