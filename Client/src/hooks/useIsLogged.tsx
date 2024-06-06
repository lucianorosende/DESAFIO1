import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../state/slices";

export function useIsLogged() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `${process.env.REACT_APP_FETCH_URL}/api/sessions/isLogged`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const responseData = await data.json();
            if (responseData === "is logged") {
                dispatch(login(true));
            }
        };
        fetchData();
    }, []);
}
