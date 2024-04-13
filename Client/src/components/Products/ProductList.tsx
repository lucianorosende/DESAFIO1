import { ProductCard } from ".";
import { Background } from "..";
import { loginParticles } from "../..";
import { useFetchProducts } from "../../hooks";
import { ProductPagination } from "./ProductPagination";

export function ProductList() {
    const { productList, pages, setRenderPage } = useFetchProducts();
    return (
        <>
            <ProductCard list={productList} />
            <ProductPagination pages={pages} setActualPage={setRenderPage} />
            <Background options={loginParticles} />
        </>
    );
}
