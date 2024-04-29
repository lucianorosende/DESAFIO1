import { TableBody } from "@mui/material";
import { CartItem } from "./CartItem";
import { ICartItem } from "../../interfaces";
import { useProfileData, useGetCart } from "../../hooks";

export function CartBody() {
    const { cID } = useProfileData();
    const { cart } = useGetCart(cID);

    return (
        <TableBody>
            {cart.map((cartItem: ICartItem) => {
                return <CartItem cartItem={cartItem} key={cartItem._id._id} />;
            })}
        </TableBody>
    );
}
