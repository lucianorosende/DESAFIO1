import Modal from "react-modal";
import { customStyles } from "../../config/modal.config";
import { ClickButton, ErrorButton } from "..";

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
                    <ClickButton
                        onClick={closeModal}
                        buttonChildren={`You will be redirected to ${redirectReference}`}
                        marginTop={15}
                    />
                </Modal>
            ) : flag === false ? (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModalError}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {message}
                    <ErrorButton
                        onClick={closeModalError}
                        buttonChildren="Try again"
                        marginTop={15}
                    />
                </Modal>
            ) : null}
        </>
    );
}
