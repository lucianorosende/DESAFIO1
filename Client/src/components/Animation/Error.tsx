import Lottie from "react-lottie";
import { Container, ButtonMaker } from "../../styles";
import errorAnimation from "../../json/errorAnimation.json";
import { useNavigate } from "react-router-dom";
import { TextAnimation } from "..";
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
        <Container $minheight={100} $background_color="#463e3e">
            <Lottie options={defaultOptions} height={400} width={400} />
            <TextAnimation sequence={errorSequence} />
            <ButtonMaker
                $background_color="#0051ff"
                $margintop={15}
                onClick={() => navigate("/")}
            >
                Login
            </ButtonMaker>
        </Container>
    );
}
