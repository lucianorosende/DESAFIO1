import { ILogin } from "../interfaces";
import { AppDispatch } from "../state/store";
import { flag, message } from "../state/slices";

export const HandleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    data: ILogin,
    dispatch: AppDispatch
) => {
    e.preventDefault();
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
            dispatch(message(`Failed to Login!`));
            dispatch(flag(false));
            return;
        } else {
            dispatch(message(`You have logged in!`));
            dispatch(flag(true));
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};
