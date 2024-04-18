import { useState, useEffect } from "react";

export function useFetchCategories() {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `http://localhost:8080/api/products/categories`,
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
    }, []);
    return { productList };
}
