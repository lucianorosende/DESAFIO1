import { useState, useEffect } from "react";
import { IProduct } from "../interfaces";

export function useFetchProductTitle(title: string) {
    const [productList, setProductList] = useState<IProduct[]>([]);

    useEffect(() => {
        if (title === "") {
            setProductList([]);
        }
        if (title !== "") {
            const fetchData = async () => {
                const data = await fetch(
                    `http://localhost:8080/api/products?title=${title}&limit=10000`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                const responseData = await data.json();
                setProductList(responseData.data.payload);
            };
            fetchData();
        }
    }, [title]);

    return { productList };
}
