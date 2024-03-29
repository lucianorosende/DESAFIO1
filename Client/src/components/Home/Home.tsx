import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect } from "react";
import { handleFetchResponse } from "../../utils";
import { Loading, Error, ProductList } from "..";

export function Home() {
    const loginState = useSelector((state: RootState) => state.login.value);
    const dispatch = useDispatch();
    useEffect(() => {
        handleFetchResponse(dispatch);
    }, [dispatch]);

    return (
        <>
            {loginState ? (
                <ProductList />
            ) : loginState === false ? (
                <Error />
            ) : (
                <Loading />
            )}
        </>
    );
}
