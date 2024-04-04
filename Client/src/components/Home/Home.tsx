import { Container } from "../..";
import { TextAnimation, Background, ClickButton, Footer } from "..";
import {
    loginSequence,
    loginParticles,
    whyChooseUsSequence,
    handleFetchResponse,
} from "../..";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        handleFetchResponse(dispatch);
    }, [dispatch]);
    return (
        <>
            <Container $minheight={100} $background_color="#463e3e">
                <TextAnimation sequence={loginSequence} />
            </Container>
            <Container $minheight={100} $background_color="#000">
                <TextAnimation sequence={whyChooseUsSequence} />
                <ClickButton
                    buttonChildren="Login Here!"
                    onClick={() => navigate("/login")}
                />
            </Container>
            <Container $minheight={100} $background_color="#ff0000">
                Product list show here
            </Container>
            <Footer />
            <Background options={loginParticles} />
        </>
    );
}
