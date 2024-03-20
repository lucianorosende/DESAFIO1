import Popup from "reactjs-popup";
import { Modal } from "../styles";
import { useNavigate } from "react-router-dom";
import { ButtonMaker, ErrorContainer } from "../styles";

export function PopupMaker({
    Text,
    Message,
    Flag,
}: {
    Text: string;
    Message: string;
    Flag: boolean | null;
}) {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate("/");
    };
    return (
        <>
            <ButtonMaker
                background_color={"#3498db"}
                background_hover_color={"#2980b9"}
            >
                {Text}
            </ButtonMaker>
            {Flag === true ? (
                <Popup open={Flag} closeOnDocumentClick onClose={closeModal}>
                    <Modal>
                        {Message}
                        <ButtonMaker
                            onClick={closeModal}
                            margintop={15}
                            background_color={"#3498db"}
                            background_hover_color={"#2980b9"}
                        >
                            Closing Will Redirect to Login
                        </ButtonMaker>
                    </Modal>
                </Popup>
            ) : Flag === false ? (
                <ErrorContainer>
                    <ButtonMaker
                        margintop={15}
                        background_color={"#ff0000"}
                        background_hover_color={"#ff3333"}
                        disabled={true}
                    >
                        {Message}
                    </ButtonMaker>
                    <ButtonMaker
                        margintop={15}
                        marginleft={15}
                        background_color={"#ff0000"}
                        background_hover_color={"#ff3333"}
                        disabled={true}
                    >
                        X
                    </ButtonMaker>
                </ErrorContainer>
            ) : null}
        </>
    );
}
