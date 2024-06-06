import { useState, useEffect } from "react";

export function useFetchCategories() {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `${process.env.REACT_APP_FETCH_URL}/api/products/categories`,
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
