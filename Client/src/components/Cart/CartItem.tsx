import { TableRow, TableCell } from "@mui/material";
import { ICartItem } from "../../interfaces";
import { ErrorButton } from "../Buttons";
import { tableCellStyle } from "../../styles";

export function CartItem({ cartItem }: { cartItem: ICartItem }) {
    return (
        <TableRow key={cartItem._id._id}>
            <TableCell>
                <img
                    src={cartItem._id.image}
                    style={{
                        maxWidth: "90%",
                    }}
                />
            </TableCell>
            <TableCell sx={tableCellStyle}>{cartItem._id.title}</TableCell>
            <TableCell sx={tableCellStyle}>{cartItem._id.category}</TableCell>
            <TableCell sx={tableCellStyle}>{cartItem.quantity}</TableCell>
            <TableCell sx={tableCellStyle}>
                ${Math.round(cartItem._id.price * cartItem.quantity)}
            </TableCell>
            <TableCell>
                <ErrorButton buttonChildren="Remove" />
            </TableCell>
        </TableRow>
    );
}
