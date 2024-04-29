import { useGetCart, useProfileData } from "../../hooks";
import { ClickButton } from "../Buttons";

export default function CartSubtotal() {
    const { cID } = useProfileData();
    const { subtotal } = useGetCart(cID);
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
            Subtotal: ${subtotal}
            <br />
            Tax(21%): ${Math.round(subtotal * 1.21)}
            <br />
            Total: ${Math.round(subtotal * 1.21)}
            <br />
            <ClickButton buttonChildren="Checkout" marginTop={10} />
        </div>
    );
}
