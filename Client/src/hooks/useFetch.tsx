import { useEffect, useState } from "react";
import { IProduct } from "..";
export function useFetch() {
    const [productList, setProductList] = useState<IProduct[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("http://localhost:8080/api/products/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const responseData = await data.json();
            setProductList(responseData.data);
        };
        fetchData();
    }, []);
    return { productList };
}
