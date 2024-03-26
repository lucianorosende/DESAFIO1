import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { useEffect } from "react";
import { handleFetchResponse } from "../utils";

export function Products() {
    const loginState = useSelector((state: RootState) => state.login.value);
    const dispatch = useDispatch();
    useEffect(() => {
        handleFetchResponse(dispatch);
    }, []);

    return (
        <>
            {loginState ? (
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Modi nostrum possimus cum earum eum dignissimos deleniti
                    officia, sunt facere animi ducimus minima odio laboriosam
                    repellat sed expedita laudantium tenetur dolorum.
                </div>
            ) : loginState === false ? (
                <div>auth error</div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}
