import { Link, useNavigate } from "react-router-dom";
import { loginParticles, loginSequence, HandleLogin } from "../utils";
import { Background, TextAnimation } from ".";
import { useState } from "react";
import {
    Label,
    FormGroup,
    Container,
    Input,
    Form,
    ButtonMaker,
} from "../styles";
export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <Container minheight={100} background_color="#463e3e">
            <TextAnimation sequence={loginSequence} />
            <Form onSubmit={(e) => HandleLogin(e, email, password, navigate)}>
                <FormGroup>
                    <Label htmlFor="Email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <ButtonMaker
                        background_color={"#4caf50"}
                        background_hover_color={"#3e8e41"}
                    >
                        Login
                    </ButtonMaker>
                </FormGroup>
                <FormGroup>
                    <ButtonMaker
                        background_color={"#3498db"}
                        background_hover_color={"#2980b9"}
                    >
                        Login with Github
                    </ButtonMaker>
                </FormGroup>
                <FormGroup>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <ButtonMaker
                            background_color={"#4caf50"}
                            background_hover_color={"#3e8e41"}
                        >
                            Sign Up
                        </ButtonMaker>
                    </Link>
                </FormGroup>
                <FormGroup>
                    <ButtonMaker
                        background_color={"#f03e3e"}
                        background_hover_color={"#c23636"}
                    >
                        Forgot Password?
                    </ButtonMaker>
                </FormGroup>
            </Form>
            <Background options={loginParticles} />
        </Container>
    );
}
