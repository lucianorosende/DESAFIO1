import { Background, TextAnimation, PopupMaker } from ".";
import { handleFormData, registerParticles, registerSequence } from "../utils";
import { Link } from "react-router-dom";
import {
    Label,
    FormGroup,
    Input,
    Form,
    ButtonMaker,
    Container,
} from "../styles";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export function Register() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    return (
        <Container $minheight={100} $background_color="#498467">
            <TextAnimation sequence={registerSequence} />
            <Form
                onSubmit={(e) =>
                    handleFormData(
                        e,
                        "http://localhost:8080/api/sessions/register",
                        {
                            email: emailRef.current?.value,
                            password: passwordRef.current?.value,
                            firstName: firstNameRef.current?.value,
                            lastName: lastNameRef.current?.value,
                            age: ageRef.current?.value,
                        },
                        dispatch
                    )
                }
            >
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        ref={firstNameRef}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        ref={lastNameRef}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Age">Age</Label>
                    <Input
                        type="text"
                        id="Age"
                        name="Age"
                        ref={ageRef}
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
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <ButtonMaker
                            $background_color={"#4caf50"}
                            $background_hover_color={"#3e8e41"}
                        >
                            Go back to login
                        </ButtonMaker>
                    </Link>
                </FormGroup>
                <FormGroup>
                    <PopupMaker
                        buttonText="Sign In"
                        redirectReference="Login"
                        redirect="/"
                    ></PopupMaker>
                </FormGroup>
            </Form>
            <Background options={registerParticles} />
        </Container>
    );
}
