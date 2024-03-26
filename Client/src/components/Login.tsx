import { Link } from "react-router-dom";
import {
    loginParticles,
    loginSequence,
    handleFormData,
    handleGithubLogin,
} from "../utils";
import { Background, PopupMaker, TextAnimation } from ".";
import { useRef } from "react";
import {
    Label,
    FormGroup,
    Container,
    Input,
    Form,
    ButtonMaker,
} from "../styles";
import { useDispatch } from "react-redux";

export function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    return (
        <Container $minheight={100} $background_color="#463e3e">
            <TextAnimation sequence={loginSequence} />
            <Form
                onSubmit={(e) =>
                    handleFormData(
                        e,
                        "http://localhost:8080/api/sessions/login",
                        {
                            email: emailRef.current?.value,
                            password: passwordRef.current?.value,
                        },
                        dispatch
                    )
                }
            >
                <FormGroup>
                    <Label htmlFor="Email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <PopupMaker
                        buttonText="Log in"
                        redirectReference="Products"
                        redirect="/products"
                    ></PopupMaker>
                </FormGroup>
                <FormGroup>
                    <ButtonMaker
                        $background_color={"#3498db"}
                        $background_hover_color={"#2980b9"}
                        onClick={handleGithubLogin}
                    >
                        Login with Github
                    </ButtonMaker>
                </FormGroup>
                <FormGroup>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <ButtonMaker
                            $background_color={"#4caf50"}
                            $background_hover_color={"#3e8e41"}
                        >
                            Sign Up
                        </ButtonMaker>
                    </Link>
                </FormGroup>
                <FormGroup>
                    <ButtonMaker
                        $background_color={"#f03e3e"}
                        $background_hover_color={"#c23636"}
                    >
                        Forgot Password?
                    </ButtonMaker>
                </FormGroup>
            </Form>
            <Background options={loginParticles} />
        </Container>
    );
}
