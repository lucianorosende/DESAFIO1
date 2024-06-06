import { useState, useEffect } from "react";
import { IProduct } from "../interfaces";

export function useFetchProductTitle(title: string) {
    const [productList, setProductList] = useState<IProduct[]>([]);

    useEffect(() => {
        if (title === "") {
            setProductList([]);
        }
        if (title !== "") {
            try {
                const fetchData = async () => {
                    const data = await fetch(
                        `${process.env.REACT_APP_FETCH_URL}/api/products?title=${title}&limit=10000`,
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
            } catch (e) {
                console.log(e);
            }
        }
    }, [title]);

    return { productList };
}
