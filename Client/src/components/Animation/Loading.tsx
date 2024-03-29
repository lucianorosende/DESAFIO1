import Lottie from "react-lottie";
import { ButtonMaker, Container } from "../../styles";
import loadingAnimation from "../../json/loadingAnimation.json";

export function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Container>
            <Lottie options={defaultOptions} height={400} width={400} />
            <ButtonMaker $background_color="#0066ffff">Loading...</ButtonMaker>
        </Container>
    );
}
