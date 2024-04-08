import { loginParticles } from "../../utils";
import { Background, LoginForm, Error } from "..";
import { Container } from "../../styles";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export function Login() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
    return (
        <Container $minheight={95} $background_color="#463e3e">
            {loginSelector === true ? <Error /> : <LoginForm />}
            <Background options={loginParticles} />
        </Container>
    );
}
