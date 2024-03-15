import { Link } from "react-router-dom";
import { loginParticles, loginSequence } from "../../utils";
import { Background, TextAnimation } from "../index";
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
} from "../../styles";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const account = {
            email: email,
            password: password,
        };
        try {
            // Fetch request with POST method
            const response = await fetch(
                "http://localhost:8080/api/sessions/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(account),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            // Handle successful response (optional)
            const responseData = await response.json();
            console.log("Form submission successful:", responseData);
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle form submission error (display message, etc.)
        }
    };
    return (
        <Container>
            <TextAnimation sequence={loginSequence} />
            <Form onSubmit={handleSubmit}>
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

export default Login;
