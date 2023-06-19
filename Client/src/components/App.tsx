import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../utils/fetchdata";
import { IProduct } from "../interfaces/IProduct";
import { TFetchedData } from "../types/TFetchedData";

const App: React.FC = () => {
    let content;
    const navigate = useNavigate();
    const [data, setData] = useState<TFetchedData>(null);

    useEffect(() => {
        fetchData(
            "http://localhost:8080/views/productsReact",
            `views/productsReact?pages=1`,
            setData,
            navigate
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (data === null) {
        return <p>Loading data...</p>;
    }

    if (data.pagination.prevPage === null)
        content = (
            <>
                <button
                    className="arrow arrow-right"
                    onClick={() =>
                        fetchData(
                            `http://localhost:8080/views/productsReact?pages=${data.pagination.nextPage}`,
                            `views/productsReact?pages=${data.pagination.nextPage}`,
                            setData,
                            navigate
                        )
                    }
                >
                    →
                </button>
                <span>{data.pagination.page}</span>
            </>
        );

    if (data.pagination.prevPage && data.pagination.nextPage)
        content = (
            <>
                <button
                    className="arrow arrow-right"
                    onClick={() =>
                        fetchData(
                            `http://localhost:8080/views/productsReact?pages=${data.pagination.prevPage}`,
                            `views/productsReact?pages=${data.pagination.prevPage}`,
                            setData,
                            navigate
                        )
                    }
                >
                    ←
                </button>
                <span>{data.pagination.page}</span>
                <button
                    className="arrow arrow-right"
                    onClick={() =>
                        fetchData(
                            `http://localhost:8080/views/productsReact?pages=${data.pagination.nextPage}`,
                            `views/productsReact?pages=${data.pagination.nextPage}`,
                            setData,
                            navigate
                        )
                    }
                >
                    →
                </button>
            </>
        );

    if (data.pagination.nextPage === null)
        content = (
            <>
                <button
                    className="arrow arrow-right"
                    onClick={() =>
                        fetchData(
                            `http://localhost:8080/views/productsReact?pages=${data.pagination.prevPage}`,
                            `views/productsReact?pages=${data.pagination.prevPage}`,
                            setData,
                            navigate
                        )
                    }
                >
                    ←
                </button>
                <span>{data.pagination.page}</span>
            </>
        );

    return (
        <>
            <h1>View Products</h1>
            <hr />
            <div className="arrow-container">{content}</div>
            <div className="card-container">
                {data.prod.map((data: IProduct) => (
                    <div className="card" key={data.pID}>
                        <h2 className="card-title">{data.title}</h2>
                        <p className="card-description">{data.description}</p>
                        <p className="card-price">${data.price}</p>
                        <p className="card-info">
                            <strong>Product Code:{data.code}</strong>
                            <br />
                            <strong>Stock:{data.stock}</strong>
                            <br />
                            <strong>Category:{data.category}</strong>
                            <br />
                            <strong>ID:{data.pID}</strong>
                        </p>
                        <button className="add-to-cart-button">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;
