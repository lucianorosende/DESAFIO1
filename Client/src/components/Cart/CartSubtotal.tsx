import { useGetCart, useProfileData } from "../../hooks";
import { ClickButton } from "../Buttons";

export default function CartSubtotal() {
    const { cID } = useProfileData();
    const { subtotalSelector } = useGetCart(cID);
    return (
        <div
            style={{
                alignSelf: "flex-end",
                margin: "2% 10% 2% 0",

                border: "2px solid white",
                padding: "10px",
                fontFamily: "monospace",
                fontSize: "20px",
                fontWeight: "bold",
            }}
        >
            Subtotal: ${subtotalSelector}
            <br />
            Tax(21%): ${Math.round(subtotalSelector * 1.21)}
            <br />
            Total: ${Math.round(subtotalSelector * 1.21)}
            <br />
            <ClickButton buttonChildren="Checkout" marginTop={10} />
        </div>
    );
}
