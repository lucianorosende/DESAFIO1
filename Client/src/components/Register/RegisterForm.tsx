import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Form } from "../../styles";
import { FormInput, PopupButton } from "..";
import { handleFormData } from "../../utils";
import { LinkedButton } from "../Buttons/LinkedButton";

export function RegisterForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    return (
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
            <FormInput
                inputType={"text"}
                inputName={"firstName"}
                reference={firstNameRef}
                labelChildren={"First Name"}
            />
            <FormInput
                inputType={"text"}
                inputName={"lastName"}
                reference={lastNameRef}
                labelChildren={"Last Name"}
            />
            <FormInput
                inputType={"email"}
                inputName={"email"}
                reference={emailRef}
                labelChildren={"Email"}
            />
            <FormInput
                inputType={"text"}
                inputName={"Age"}
                reference={ageRef}
                labelChildren={"Age"}
            />
            <FormInput
                inputType={"password"}
                inputName={"password"}
                reference={passwordRef}
                labelChildren={"Password"}
            />
            <LinkedButton
                navigateTo={"/login"}
                buttonChildren="Go back to login"
            />
            <PopupButton
                buttonText="Sign In"
                redirectReference="Login"
                navigateTo="/login"
            />
        </Form>
    );
}
