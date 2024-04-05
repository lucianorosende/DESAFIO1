import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../state/slices";

export function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
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
    return { handleLogout };
}
