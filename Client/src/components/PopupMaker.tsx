import Popup from "reactjs-popup";
import { Modal } from "../styles";
import { useNavigate } from "react-router-dom";
import { ButtonMaker } from "../styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { resetFlag } from "../state/flag/flagSlice";

export function PopupMaker({
    Text,
    Message,
}: {
    Text: string;
    Message: string;
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const closeModal = () => {
        navigate("/");
        dispatch(resetFlag());
    };
    const closeModalError = () => {
        dispatch(resetFlag());
    };
    const flag = useSelector((state: RootState) => state.flag.value);
    return (
        <>
            <ButtonMaker
                background_color={"#3498db"}
                background_hover_color={"#2980b9"}
            >
                {Text}
            </ButtonMaker>
            {flag === true ? (
                <Popup open={flag} closeOnDocumentClick onClose={closeModal}>
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
            ) : flag === false ? (
                <Popup
                    open={true}
                    closeOnDocumentClick
                    onClose={closeModalError}
                >
                    <Modal>
                        {Message}
                        <ButtonMaker
                            onClick={closeModalError}
                            margintop={15}
                            background_color={"#ff3333"}
                            background_hover_color={"#ff0000"}
                        >
                            Close
                        </ButtonMaker>
                    </Modal>
                </Popup>
            ) : null}
        </>
    );
}
