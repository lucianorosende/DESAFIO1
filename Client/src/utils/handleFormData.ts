import { ILogin, IRegister } from "../interfaces";
import { AppDispatch } from "../state/store";
import { flag, message } from "../state/slices";

export const handleFormData = async (
    e: React.FormEvent<HTMLFormElement>,
    url: string,
    data: ILogin | IRegister,
    dispatch: AppDispatch
) => {
    e.preventDefault();
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const responseData = await response.json();
        if (responseData.error) {
            dispatch(message(`${responseData.error}`));
            dispatch(flag(false));
            return;
        } else {
            dispatch(message(`${responseData.msg}`));
            dispatch(flag(true));
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};
