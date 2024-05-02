import { useDispatch } from "react-redux";
import { cart, subtotal } from "../state/slices";

export function useUpdateQuantity() {
    const dispatch = useDispatch();
    const handleUpdateQuantity = async (
        cID: number | undefined,
        pID: number,
        actualQuantity: number | undefined
    ) => {
        const quantity = { quantity: actualQuantity };
        try {
            const response = await fetch(
                `http://localhost:8080/api/carts/${cID}/products/${pID}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(quantity),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const responseData = await response.json();
            if (responseData.status == "success") {
                dispatch(cart(responseData.data[0].products));
                dispatch(subtotal(responseData.data[1].subtotal));
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return { handleUpdateQuantity };
}
