import { Link } from "react-router-dom";
import { loginParticles, loginSequence } from "../../utils";
import { Background, TextAnimation } from "../index";
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
    return (
        <Container>
            <TextAnimation sequence={loginSequence} />
            <Form action="/api/sessions/login" method="POST">
                <FormGroup>
                    <Label htmlFor="Email">Email</Label>
                    <Input type="email" id="email" name="email" required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
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
