import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { subtotal, cart } from "../state/slices";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export function useGetCart(cID: number | undefined) {
    const cartSelector = useSelector((state: RootState) => state.cart.value);
    const subtotalSelector = useSelector(
        (state: RootState) => state.subtotal.value
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (typeof cID !== "undefined") {
            const handleCartData = async () => {
                try {
                    const checker = await fetch(
                        `${process.env.REACT_APP_FETCH_URL}/api/carts/${cID}/populate`,
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
                        dispatch(cart(data.data[0].products));
                        dispatch(subtotal(data.data[1].subtotal));
                    }
                } catch (e) {
                    console.log(e);
                }
            };
            handleCartData();
        }
    }, [cID, dispatch]);
    return { cartSelector, subtotalSelector };
}
