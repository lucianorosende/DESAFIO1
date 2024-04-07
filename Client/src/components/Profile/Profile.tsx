import { useNavigate } from "react-router-dom";
import { Container, Form } from "../../styles";
import { ClickButton, ErrorButton } from "../Buttons";
import { Background, Error } from "../Animation";
import { registerParticles } from "../../utils";
import { useLogout, useProfileData } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export function Profile() {
    const navigate = useNavigate();
    const { handleLogout } = useLogout();
    const { firstName, lastName, email, admin } = useProfileData();
    const loginSelector = useSelector((state: RootState) => state.login.value);
    return (
        <>
            {loginSelector === true ? (
                <Container $minheight={95}>
                    <Form>
                        <h2>Personal information</h2>
                        <span>Name: {firstName}</span>
                        <span>Surname: {lastName}</span>
                        <h2>Contact</h2>
                        <span>Email: {email}</span>
                        <span>Admin:{admin} </span>
                        <br />
                        <div className="form-group">
                            <ErrorButton
                                buttonChildren="Logout"
                                onClick={handleLogout}
                            ></ErrorButton>
                            <ClickButton
                                buttonChildren="Home"
                                onClick={() => navigate("/")}
                            ></ClickButton>
                        </div>
                    </Form>
                    <Background options={registerParticles} />
                </Container>
            ) : (
                <Error />
            )}
        </>
    );
}
