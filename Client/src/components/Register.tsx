import { Background } from ".";
import { registerParticles } from "../utils";
import { Link } from "react-router-dom";
import { TextAnimation } from ".";
import {
    SuccessButton,
    InteractButton,
    Label,
    FormGroup,
    RegisterContainer,
    Input,
    Form,
} from "../styles";
import { registerSequence } from "../utils";

export function Register() {
    return (
        <RegisterContainer>
            <TextAnimation sequence={registerSequence} />
            <Form action="/api/sessions/register" method="POST">
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input type="text" id="lastName" name="lastName" required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Age">Age</Label>
                    <Input type="text" id="Age" name="Age" required />
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
                    <Link to="/">
                        <SuccessButton>Go back to Login</SuccessButton>
                    </Link>
                </FormGroup>
                <FormGroup>
                    <InteractButton>Sign in</InteractButton>
                </FormGroup>
            </Form>
            <Background options={registerParticles} />
        </RegisterContainer>
    );
}
