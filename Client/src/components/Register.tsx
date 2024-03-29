import { Background, TextAnimation, RegisterForm } from ".";
import { registerParticles, registerSequence } from "../utils";

import { Container } from "../styles";

export function Register() {
    return (
        <Container $minheight={100} $background_color="#498467">
            <TextAnimation sequence={registerSequence} />
            <RegisterForm />
            <Background options={registerParticles} />
        </Container>
    );
}
