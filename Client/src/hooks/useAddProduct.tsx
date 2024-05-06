import { IProduct } from "../interfaces";
import { toast } from "react-toastify";

export function useAddProduct() {
    const handleAddProductInCart = async (
        pID: number | undefined,
        cID: number | undefined,
        product: IProduct
    ) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/carts/${cID}/product/${pID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const responseData = await response.json();
            if (responseData.msg == "Product added successfully into cart") {
                toast(`You have Added ${product.title} to the cart!`, {
                    position: "bottom-left",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (
                responseData.msg ===
                "You have exceeded the maximum number of products"
            ) {
                toast("You have exceeded the maximum number of products", {
                    position: "bottom-left",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return { handleAddProductInCart };
}
