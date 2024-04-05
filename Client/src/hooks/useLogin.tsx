import { modalFlag, message, login } from "../state/slices";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export function useLogin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        };
        try {
            const response = await fetch(
                "http://localhost:8080/api/sessions/login",
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
                dispatch(login(false));
                return;
            } else {
                dispatch(message(`${responseData.msg}`));
                dispatch(modalFlag(true));
                dispatch(login(true));
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return { handleLogin, emailRef, passwordRef };
}
