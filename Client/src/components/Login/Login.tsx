import { loginParticles, loginSequence } from "../../utils";
import { Background, LoginForm, TextAnimation } from "..";

import { Container } from "../../styles";

export function Login() {
    return (
        <Container $minheight={100} $background_color="#463e3e">
            <TextAnimation sequence={loginSequence} />
            <LoginForm />
            <Background options={loginParticles} />
        </Container>
    );
}
