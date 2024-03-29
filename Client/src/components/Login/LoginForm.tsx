import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Form } from "../../styles";
import {
    ClickButton,
    FormInput,
    PopupButton,
    LinkedButton,
    NormalButton,
} from "..";

import { handleFormData, handleGithubLogin } from "../../utils";

export function LoginForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    return (
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
            <FormInput
                inputType={"email"}
                inputName={"email"}
                reference={emailRef}
                labelChildren={"Email"}
            />
            <FormInput
                inputType={"password"}
                inputName={"password"}
                reference={passwordRef}
                labelChildren={"Password"}
            />
            <PopupButton
                buttonText="Log in"
                redirectReference="Home"
                navigateTo="/home"
            />
            <ClickButton
                buttonBGcolor="#3498db"
                buttonHoverColor="#2980b9"
                buttonChildren="Login with Github"
                onClick={handleGithubLogin}
            />
            <LinkedButton
                navigateTo="/register"
                buttonBGcolor="#4caf50"
                buttonHoverColor="#3e8e41"
                buttonChildren="Sign Up"
            />
            <NormalButton
                buttonBGcolor="#f03e3e"
                buttonHoverColor="#c23636"
                buttonChildren="Forgot Password?"
            />
        </Form>
    );
}
