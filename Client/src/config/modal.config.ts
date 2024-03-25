import Modal, { Styles } from "react-modal";

Modal.setAppElement("#root");
export const customStyles: Styles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "50px",
        boxShadow: "0 0 10px black",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
};
