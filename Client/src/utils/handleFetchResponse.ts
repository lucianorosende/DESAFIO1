import { login } from "../state/slices";
import { AppDispatch } from "../state/store";

export const handleFetchResponse = async (dispatch: AppDispatch) => {
    try {
        const checker = await fetch(
            "http://localhost:8080/api/sessions/isLogged",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );
        const data = await checker.json();
        if (data === "is logged") {
            dispatch(login(true));
        } else {
            dispatch(login(false));
        }
        return data;
    } catch (e) {
        console.log(e);
    }
};
