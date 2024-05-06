import { Input } from "@mui/joy";
import { Button } from "@mui/material";
import { useState } from "react";
import {
    useProfileData,
    useUpdateQuantity,
    useDeleteProductFromCart,
} from "../../hooks";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast } from "react-toastify";

export function QuantityCell({
    productQuantity,
    pID,
    stock,
}: {
    productQuantity: number;
    pID: number;
    stock: number;
}) {
    const [quantity, setQuantity] = useState(productQuantity);
    const { cID } = useProfileData();
    const { handleUpdateQuantity } = useUpdateQuantity();
    const { handleDeleteProductFromCart } = useDeleteProductFromCart(cID, pID);
    const handleAddQuantity = () => {
        if (quantity >= stock) {
            toast.error(`Quantity Exceeded!`, {
                position: "bottom-left",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        const value = quantity + 1;
        setQuantity(value);
        handleUpdateQuantity(cID, pID, value);
    };
    const handleDecrementQuantity = () => {
        if (quantity <= 1) {
            handleDeleteProductFromCart();
            return;
        }
        const value = quantity - 1;
        setQuantity(value);
        handleUpdateQuantity(cID, pID, value);
    };
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Input value={quantity} sx={{ width: "45px" }} variant="solid" />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                    variant="contained"
                    sx={{ padding: 0, minWidth: "30px" }}
                    onClick={handleAddQuantity}
                >
                    <KeyboardArrowUpIcon />
                </Button>
                <Button
                    variant="contained"
                    sx={{ padding: 0, minWidth: "30px" }}
                    onClick={handleDecrementQuantity}
                >
                    <KeyboardArrowDownIcon />
                </Button>
            </div>
        </div>
    );
}
