import Popup from "reactjs-popup";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IStyledComponent } from "styled-components";
import { Substitute } from "styled-components/dist/types";
import { Modal, ErrorButton } from "../styles";
import { marginProps } from "../interfaces";
import { useNavigate } from "react-router-dom";

export function PopupMaker({
    Button,
    Text,
    Message,
    Flag,
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
    Message: string;
    Flag: boolean | null;
}) {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate("/");
    };
    return (
        <>
            <Button>{Text}</Button>
            {Flag ? (
                <Popup open={Flag} closeOnDocumentClick onClose={closeModal}>
                    <Modal>
                        {Message}
                        <Button onClick={closeModal} margintop={15}>
                            Closing Will Redirect to Login
                        </Button>
                    </Modal>
                </Popup>
            ) : Flag === false ? (
                <ErrorButton margintop={15}>{Message}</ErrorButton>
            ) : null}
        </>
    );
}
