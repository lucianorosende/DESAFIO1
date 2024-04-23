import { useLocation } from "react-router-dom";
import { useFetchAllProducts } from "../../hooks";
import { ProductCard } from "./ProductCard";
import { Error } from "../Animation";

function removeSearchPart(text: string) {
    const indexOfSlash = text.lastIndexOf("/");
    if (indexOfSlash !== -1) {
        return text.substring(indexOfSlash + 1);
    } else {
        return text;
    }
}

export function ProductListQuery() {
    const location = useLocation();
    const searchValue = removeSearchPart(location.pathname);
    const { productList } = useFetchAllProducts(searchValue);
    return productList.length > 0 ? (
        <ProductCard list={productList} />
    ) : (
        <Error />
    );
}
