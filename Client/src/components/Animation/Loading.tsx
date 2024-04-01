import Lottie from "react-lottie";
import { Container } from "../../styles";
import loadingAnimation from "../../json/loadingAnimation.json";
import { ClickButton } from "..";
import { useNavigate } from "react-router-dom";
export function Loading() {
    const navigate = useNavigate();
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
            <ClickButton buttonChildren="Loading..." />
            <ClickButton
                buttonChildren="Go back to login?"
                onClick={() => navigate("/")}
            />
        </Container>
    );
}
