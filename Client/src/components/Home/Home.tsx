import { Container } from "../..";
import { TextAnimation, Background, Footer, ProductList } from "..";
import { loginSequence, loginParticles, whyChooseUsSequence } from "../..";
import { CategoryList } from "../Categories";

export function Home() {
    return (
        <>
            <Container $minheight={100} $background_color="#463e3e">
                <TextAnimation sequence={loginSequence} />

                <ProductList />
            </Container>
            <Container $minheight={100} $background_color="#498467">
                <TextAnimation sequence={whyChooseUsSequence} />
                <CategoryList />
            </Container>
            <Footer />
            <Background options={loginParticles} />
        </>
    );
}
