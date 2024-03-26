import Lottie from "react-lottie";
import { Container, ButtonMaker } from "../styles";
import errorAnimation from "../json/errorAnimation.json";
import { useNavigate } from "react-router-dom";

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
        <Container>
            <Lottie options={defaultOptions} height={400} width={400} />
            <ButtonMaker $background_color="#ff0000">
                Authorization Error!
            </ButtonMaker>
            <ButtonMaker
                $background_color="#0051ff"
                $margintop={15}
                onClick={() => navigate("/")}
            >
                Go back to login
            </ButtonMaker>
        </Container>
    );
}
