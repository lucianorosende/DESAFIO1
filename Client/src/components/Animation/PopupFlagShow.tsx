import Modal from "react-modal";
import { ButtonMaker } from "../..";
import { customStyles } from "../../config/modal.config";

export function PopupFlagShow({
    flag,
    modalIsOpen,
    closeModal,
    closeModalError,
    message,
    redirectReference,
}: {
    flag: boolean | null;
    modalIsOpen: boolean;
    closeModal: () => void;
    closeModalError: () => void;
    message: string;
    redirectReference: string;
}) {
    return (
        <>
            {flag === true ? (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {message}
                    <ButtonMaker
                        $background_color={"#3498db"}
                        $background_hover_color={"#2980b9"}
                        onClick={closeModal}
                        $margintop={15}
                    >
                        You will be redirected to {redirectReference}
                    </ButtonMaker>
                </Modal>
            ) : flag === false ? (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModalError}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {message}
                    <ButtonMaker
                        $background_color={"#ff0000"}
                        onClick={closeModalError}
                        $margintop={15}
                    >
                        Try again
                    </ButtonMaker>
                </Modal>
            ) : null}
        </>
    );
}
