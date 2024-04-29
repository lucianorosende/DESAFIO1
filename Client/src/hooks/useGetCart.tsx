import { useEffect, useState } from "react";
import { ICartItem } from "../interfaces";

export function useGetCart(cID: number | undefined) {
    const [cart, setCart] = useState<ICartItem[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);
    useEffect(() => {
        if (typeof cID !== "undefined") {
            const handleCartData = async () => {
                try {
                    const checker = await fetch(
                        `http://localhost:8080/api/carts/${cID}/populate`,
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
                        setCart(data.data[0].products);
                        setSubtotal(data.data[1].subtotal);
                    }
                } catch (e) {
                    console.log(e);
                }
            };
            handleCartData();
        }
    }, [cID]);
    return { cart, subtotal };
}
