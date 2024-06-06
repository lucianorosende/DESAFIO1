import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../state/slices";
import { toast } from "react-toastify";

export function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const checker = await fetch(
                `${process.env.REACT_APP_FETCH_URL}/api/sessions/logout`,
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
                toast("You have Logged out!", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    return { handleLogout };
}
