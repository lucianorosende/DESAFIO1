import { loginParticles } from "../../utils";
import { Background, LoginForm } from "..";
import { Container } from "../../styles";

export function Login() {
    return (
        <Container $minheight={95} $background_color="#463e3e">
            <LoginForm />
            <Background options={loginParticles} />
        </Container>
    );
}
