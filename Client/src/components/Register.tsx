import { Background, TextAnimation, PopupMaker } from ".";
import { registerParticles } from "../utils";
import { Link } from "react-router-dom";
import {
    Label,
    FormGroup,
    Input,
    Form,
    ButtonMaker,
    Container,
} from "../styles";
import { registerSequence } from "../utils";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import { IRegister } from "../interfaces";
import { useDispatch } from "react-redux";
import { flagFalse, flagTrue } from "../state/flag/flagSlice";

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const data: IRegister = {
        email,
        password,
        firstName,
        lastName,
        age,
    };
    const HandleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8080/api/sessions/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                console.log("error");
            }
            const responseData = await response.json();
            if (responseData.error) {
                setMessage(`ERROR: ${responseData.error}`);
                dispatch(flagFalse());
            } else {
                setMessage("You have registered Successfully");
                dispatch(flagTrue());
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return (
        <Container minheight={100} background_color="#498467">
            <TextAnimation sequence={registerSequence} />
            <Form onSubmit={HandleRegister}>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="Age">Age</Label>
                    <Input
                        type="text"
                        id="Age"
                        name="Age"
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <ButtonMaker
                            background_color={"#4caf50"}
                            background_hover_color={"#3e8e41"}
                            onClick={() => dispatch(flagTrue())}
                        >
                            Go back to login
                        </ButtonMaker>
                    </Link>
                </FormGroup>
                <FormGroup>
                    <PopupMaker Text="Sign In" Message={message}></PopupMaker>
                </FormGroup>
            </Form>
            <Background options={registerParticles} />
        </Container>
    );
}
