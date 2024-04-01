import { TNavigateParams } from "..";
import { login } from "../state/slices";
import { AppDispatch } from "../state/store";

export const handleLogout = async (
    dispatch: AppDispatch,
    navigate: TNavigateParams
) => {
    try {
        const checker = await fetch(
            "http://localhost:8080/api/sessions/logout",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );
        const data = await checker.json();
        if (data.status === "success") {
            dispatch(login(false));
            navigate("/");
        }
    } catch (e) {
        console.log(e);
    }
};
