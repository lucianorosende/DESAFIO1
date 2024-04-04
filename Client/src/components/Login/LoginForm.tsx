import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Form } from "../../styles";
import {
    ClickButton,
    FormInput,
    PopupButton,
    LinkedButton,
    ErrorButton,
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
                navigateTo="/"
            />
            <ClickButton
                buttonChildren="Login with Github"
                onClick={handleGithubLogin}
            />
            <LinkedButton navigateTo="/register" buttonChildren="Sign Up" />
            <ErrorButton buttonChildren="Forgot Password?" onClick={() => {}} />
        </Form>
    );
}
