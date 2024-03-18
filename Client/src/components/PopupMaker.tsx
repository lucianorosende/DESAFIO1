import Popup from "reactjs-popup";
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react";
import { IStyledComponent } from "styled-components";
import { Substitute } from "styled-components/dist/types";
import { Modal } from "../styles";
import { marginProps } from "../interfaces";

export function PopupMaker({
    Button,
    Text,
    ModalText,
}: {
    Button: IStyledComponent<
        "web",
        Substitute<
            DetailedHTMLProps<
                ButtonHTMLAttributes<HTMLButtonElement>,
                HTMLButtonElement
            >,
            marginProps
        >
    >;
    Text: string;
    ModalText: string;
}) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    return (
        <>
            <Button onClick={() => setOpen((o) => !o)}>{Text}</Button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <Modal>
                    {ModalText}
                    <Button onClick={closeModal} margintop={15}>
                        Close
                    </Button>
                </Modal>
            </Popup>
        </>
    );
}
