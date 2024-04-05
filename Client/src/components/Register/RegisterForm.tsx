import { useRegister } from "../../hooks";
import { Form } from "../../styles";
import { FormInput, PopupButton } from "..";
import { LinkedButton } from "../Buttons/LinkedButton";

export function RegisterForm() {
    const {
        emailRef,
        passwordRef,
        firstNameRef,
        lastNameRef,
        ageRef,
        handleRegister,
    } = useRegister();
    return (
        <Form onSubmit={handleRegister}>
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
