import { Link, useNavigate } from "react-router-dom";
import { loginParticles, loginSequence, HandleLogin } from "../utils";
import { Background, TextAnimation } from ".";
import { useState } from "react";
import {
    SuccessButton,
    ErrorButton,
    InteractButton,
    Label,
    FormGroup,
    Container,
    Input,
    Anchor,
    Form,
} from "../styles";
export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <Container>
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
                    <SuccessButton type="submit">Login</SuccessButton>
                </FormGroup>
                <FormGroup>
                    <SuccessButton type="submit">
                        <Anchor href="/api/sessions/github">
                            Login with Github
                        </Anchor>
                    </SuccessButton>
                </FormGroup>
                <FormGroup>
                    <Link to="/register">
                        <InteractButton>Sign Up</InteractButton>
                    </Link>
                </FormGroup>
                <FormGroup>
                    <ErrorButton type="submit">
                        <Anchor href="/views/recover-pass">
                            Forgot Password?
                        </Anchor>
                    </ErrorButton>
                </FormGroup>
            </Form>
            <Background options={loginParticles} />
        </Container>
    );
}
