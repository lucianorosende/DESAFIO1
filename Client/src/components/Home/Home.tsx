import { Container } from "../..";
import {
    TextAnimation,
    Background,
    ClickButton,
    Footer,
    ProductList,
} from "..";
import { loginSequence, loginParticles, whyChooseUsSequence } from "../..";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Container $minheight={100} $background_color="#463e3e">
                <TextAnimation sequence={loginSequence} />
                <ProductList />
            </Container>
            <Container $minheight={100} $background_color="#498467">
                <TextAnimation sequence={whyChooseUsSequence} />
                <ClickButton
                    buttonChildren="Login Here!"
                    onClick={() => navigate("/login")}
                />
            </Container>
            <Footer />
            <Background options={loginParticles} />
        </>
    );
}
