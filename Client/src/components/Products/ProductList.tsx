import { Container } from "../../styles";
import { ProductCard } from ".";
import { Background } from "..";
import { loginParticles } from "../..";

export function ProductList() {
    return (
        <>
            <Container $flexDirection="row" $minheight={75} $alignItems="auto">
                <ProductCard />
                <Background options={loginParticles} />
            </Container>
        </>
    );
}
