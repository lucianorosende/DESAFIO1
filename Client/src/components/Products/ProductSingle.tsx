import { useFetchAllProducts } from "../../hooks";
import { useLocation } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { removeSearchPart } from "../../utils";

export function ProductSingle() {
    const location = useLocation();
    const searchValue = removeSearchPart(location.pathname);
    const { productListAll } = useFetchAllProducts(searchValue);
    return <ProductCard list={productListAll} />;
}
