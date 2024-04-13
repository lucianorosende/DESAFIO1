import { useEffect, useState } from "react";
import { IProduct } from "..";
export function useFetchProducts() {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [pages, setPages] = useState(undefined);
    const [renderPage, setRenderPage] = useState<number>(1);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `http://localhost:8080/api/products?pages=${renderPage}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const responseData = await data.json();
            console.log(responseData);
            setProductList(responseData.data.payload);
            setPages(responseData.data.totalPages);
        };
        fetchData();
    }, [renderPage]);
    return { productList, pages, setRenderPage };
}
