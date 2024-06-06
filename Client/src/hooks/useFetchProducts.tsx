import { useEffect, useState } from "react";
import { IProduct } from "..";
export function useFetchProducts(title: string | undefined, limit: number) {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [pages, setPages] = useState(undefined);
    const [renderPage, setRenderPage] = useState<number>(1);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `${process.env.FETCH_URL}/api/products?pages=${renderPage}&title=${title}&limit=${limit}`,
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
            setPages(responseData.data.totalPages);
        };
        fetchData();
    }, [renderPage, title, limit]);
    return { productList, pages, setRenderPage };
}
