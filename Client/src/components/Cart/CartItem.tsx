import { TableRow, TableCell } from "@mui/material";
import { ICartItem } from "../../interfaces";
import { tableCellStyle } from "../../styles";
import { QuantityCell } from "./QuantityCell";
import { DeleteProduct } from "./DeleteProduct";

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
            <TableCell sx={tableCellStyle}>
                <QuantityCell
                    productQuantity={cartItem.quantity}
                    pID={cartItem.pID}
                    stock={cartItem._id.stock}
                />
            </TableCell>
            <TableCell sx={tableCellStyle}>
                ${Math.round(cartItem._id.price * cartItem.quantity)}
            </TableCell>
            <TableCell>
                <DeleteProduct pID={cartItem.pID} />
            </TableCell>
        </TableRow>
    );
}
