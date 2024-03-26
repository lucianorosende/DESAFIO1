import { ButtonMaker } from "../styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { flag } from "../state/slices";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../config/modal.config";

export function PopupMaker({
    buttonText,
    redirectReference,
    redirect,
}: {
    buttonText: string;
    redirectReference: string;
    redirect: string;
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        dispatch(flag(null));
        navigate(redirect);
    }
    function closeModalError() {
        setIsOpen(false);
        dispatch(flag(null));
    }

    useEffect(() => {}, []);

    const flagSelector = useSelector((state: RootState) => state.flag.value);
    const messageSelector = useSelector(
        (state: RootState) => state.message.value
    );
    return (
        <>
            <ButtonMaker
                $background_color={"#3498db"}
                $background_hover_color={"#2980b9"}
                onClick={openModal}
            >
                {buttonText}
            </ButtonMaker>

            {flagSelector === true ? (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {messageSelector}
                    <ButtonMaker
                        $background_color={"#3498db"}
                        $background_hover_color={"#2980b9"}
                        onClick={closeModal}
                        $margintop={15}
                    >
                        You will be redirected to {redirectReference}
                    </ButtonMaker>
                </Modal>
            ) : flagSelector === false ? (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModalError}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {messageSelector}
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
