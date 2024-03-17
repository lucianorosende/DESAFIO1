import { TNavigateParams } from "../types";

export const HandleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    navigate: TNavigateParams
) => {
    e.preventDefault();
    const account = {
        email: email,
        password: password,
    };
    try {
        const response = await fetch(
            "http://localhost:8080/api/sessions/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(account),
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const responseData = await response.json();
        if (responseData.error) {
            console.log(`error: ${responseData.error}`);
            return;
        } else {
            console.log("Form submission successful:", responseData);
            navigate("/products");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};
