import { TableRow, TableCell, Button } from "@mui/material";
import { ICartItem } from "../../interfaces";
import { ErrorButton } from "../Buttons";
import { tableCellStyle } from "../../styles";
import {
    useDeleteProductFromCart,
    useProfileData,
    useUpdateQuantity,
} from "../../hooks";
import { Input } from "@mui/joy";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function CartItem({ cartItem }: { cartItem: ICartItem }) {
    const { cID } = useProfileData();
    const { handleDeleteProductFromCart } = useDeleteProductFromCart(
        cID,
        cartItem.pID
    );
    const { handleUpdateQuantity } = useUpdateQuantity();
    const handleAddQuantity = (quant: number) => {
        const value = quant + 1;
        handleUpdateQuantity(cID, cartItem.pID, value);
    };
    const handleDecrementQuantity = (quant: number) => {
        if (quant <= 1) return;
        const value = quant - 1;
        handleUpdateQuantity(cID, cartItem.pID, value);
    };
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Input
                        value={cartItem.quantity}
                        sx={{ width: "45px" }}
                        variant="solid"
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Button
                            variant="contained"
                            sx={{ padding: 0, minWidth: "30px" }}
                            onClick={() => handleAddQuantity(cartItem.quantity)}
                        >
                            <KeyboardArrowUpIcon />
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ padding: 0, minWidth: "30px" }}
                            onClick={() =>
                                handleDecrementQuantity(cartItem.quantity)
                            }
                        >
                            <KeyboardArrowDownIcon />
                        </Button>
                    </div>
                </div>
            </TableCell>
            <TableCell sx={tableCellStyle}>
                ${Math.round(cartItem._id.price * cartItem.quantity)}
            </TableCell>
            <TableCell>
                <ErrorButton
                    buttonChildren="Remove"
                    onClick={handleDeleteProductFromCart}
                />
            </TableCell>
        </TableRow>
    );
}
