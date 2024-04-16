import Lottie from "react-lottie";
import { Container } from "../../styles";
import errorAnimation from "../../json/errorAnimation.json";
import { useNavigate } from "react-router-dom";
import { ClickButton, TextAnimation } from "..";
import { errorSequence } from "../../utils";

export function Error() {
    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: errorAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Container $minheight={95} $background_color="#463e3e">
            <Lottie options={defaultOptions} height={400} width={400} />
            <TextAnimation sequence={errorSequence} />
            <ClickButton
                buttonChildren="Go back to home"
                onClick={() => navigate("/")}
            />
        </Container>
    );
}
