import { useState, useEffect } from "react";
import { IProduct } from "../interfaces";

export function useFetchAllProducts(filter: string) {
    const [productList, setProductList] = useState<IProduct[]>([]);

    useEffect(() => {
        if (filter.length > 0) {
            const fetchData = async () => {
                const filterLower = filter.toLowerCase();
                const data = await fetch(
                    `http://localhost:8080/api/products/filter/${filterLower}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                );
                const responseData = await data.json();
                setProductList(responseData.data);
            };
            fetchData();
        }
    }, [filter]);
    return { productList };
}
