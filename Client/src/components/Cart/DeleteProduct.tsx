import { ErrorButton } from "../Buttons";
import { useProfileData, useDeleteProductFromCart } from "../../hooks";

export function DeleteProduct({ pID }: { pID: number }) {
    const { cID } = useProfileData();
    const { handleDeleteProductFromCart } = useDeleteProductFromCart(cID, pID);
    return (
        <ErrorButton
            buttonChildren="Remove"
            onClick={handleDeleteProductFromCart}
        />
    );
}
