import { useDispatch } from "react-redux";
import { useRef } from "react";
import { modalFlag, message } from "../state/slices";

export function useRegister() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
            age: ageRef.current?.value,
        };
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
                throw new Error(`Error: ${response.statusText}`);
            }
            const responseData = await response.json();
            if (responseData.error) {
                dispatch(message(`${responseData.error}`));
                dispatch(modalFlag(false));
                return;
            } else {
                dispatch(message(`${responseData.msg}`));
                dispatch(modalFlag(true));
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return {
        emailRef,
        passwordRef,
        firstNameRef,
        lastNameRef,
        ageRef,
        handleRegister,
    };
}
