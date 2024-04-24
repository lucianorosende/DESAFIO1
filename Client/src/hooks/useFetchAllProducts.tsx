import { useState, useEffect } from "react";
import { IProduct } from "../interfaces";

export function useFetchAllProducts(filter: string) {
    const [productListAll, setProductListAll] = useState<IProduct[]>([]);

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
                setProductListAll(responseData.data);
            };
            fetchData();
        }
    }, [filter]);
    return { productListAll };
}
