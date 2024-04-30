import { useDispatch } from "react-redux";
import { cart, subtotal } from "../state/slices";
import { toast } from "react-toastify";

export function useDeleteProductFromCart(cID: number | undefined, pID: number) {
    const dispatch = useDispatch();
    const handleDeleteProductFromCart = async () => {
        try {
            const checker = await fetch(
                `http://localhost:8080/api/carts/${cID}/products/${pID}`,
                {
                    method: "DELETE",
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
                toast(`You have deleted an item from the cart!`, {
                    position: "bottom-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return { handleDeleteProductFromCart };
}
