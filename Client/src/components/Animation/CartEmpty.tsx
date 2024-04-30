import cartEmptyAnimation from "../../json/cartEmptyAnimation.json";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { ClickButton } from "../Buttons";
import { Container } from "../../styles";
import { TextAnimation } from "./TextAnimation";
import { cartEmptySequence } from "../../utils";

export function CartEmpty() {
    const navigate = useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: cartEmptyAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Container>
            <Lottie options={defaultOptions} height={400} width={400} />
            <TextAnimation sequence={cartEmptySequence} />
            <ClickButton buttonChildren="Home" onClick={() => navigate("/")} />
        </Container>
    );
}
