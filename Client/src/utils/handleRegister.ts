import { IRegister } from "../interfaces";
import { flag, message } from "../state/slices";
import { AppDispatch } from "../state/store";

export const HandleRegister = async (
    e: React.FormEvent<HTMLFormElement>,
    data: IRegister,
    dispatcher: AppDispatch
) => {
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
            dispatcher(message(`ERROR: ${responseData.error}`));
            dispatcher(flag(false));
        } else {
            dispatcher(message("You have registered Successfully"));

            dispatcher(flag(true));
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};
