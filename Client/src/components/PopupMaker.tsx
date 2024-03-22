import Popup from "reactjs-popup";
import { Modal } from "../styles";
import { useNavigate } from "react-router-dom";
import { ButtonMaker } from "../styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { flag } from "../state/slices";

export function PopupMaker({
    buttonText,
    redirectReference,
    redirect,
}: {
    buttonText: string;
    redirectReference: string;
    redirect: string;
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const closeModal = () => {
        navigate(redirect);
        dispatch(flag(null));
    };
    const closeModalError = () => {
        dispatch(flag(null));
    };
    const flagSelector = useSelector((state: RootState) => state.flag.value);
    const messageSelector = useSelector(
        (state: RootState) => state.message.value
    );
    return (
        <>
            <ButtonMaker
                $background_color={"#3498db"}
                $background_hover_color={"#2980b9"}
            >
                {buttonText}
            </ButtonMaker>
            {flagSelector === true ? (
                <Popup
                    open={flagSelector}
                    closeOnDocumentClick
                    onClose={closeModal}
                >
                    <Modal>
                        {messageSelector}
                        <ButtonMaker
                            onClick={closeModal}
                            $margintop={15}
                            $background_color={"#3498db"}
                            $background_hover_color={"#2980b9"}
                        >
                            Closing Will Redirect to {redirectReference}
                        </ButtonMaker>
                    </Modal>
                </Popup>
            ) : flagSelector === false ? (
                <Popup
                    open={true}
                    closeOnDocumentClick
                    onClose={closeModalError}
                >
                    <Modal>
                        {messageSelector}
                        <ButtonMaker
                            onClick={closeModalError}
                            $margintop={15}
                            $background_color={"#ff3333"}
                            $background_hover_color={"#ff0000"}
                        >
                            Close
                        </ButtonMaker>
                    </Modal>
                </Popup>
            ) : null}
        </>
    );
}
