import { useLocation } from "react-router-dom";
import { useFetchProducts } from "../../hooks";
import { ProductCard } from "./ProductCard";
import { Error } from "../Animation";
import { ProductPagination } from "./ProductPagination";
import { removeSearchPart } from "../../utils";

export function ProductListQuery() {
    const location = useLocation();
    const searchValue = removeSearchPart(location.pathname);
    const { productList, pages, setRenderPage } = useFetchProducts(
        searchValue,
        3
    );
    return productList.length > 0 ? (
        <>
            <ProductCard list={productList} />
            <ProductPagination pages={pages} setActualPage={setRenderPage} />
        </>
    ) : (
        <Error />
    );
}
