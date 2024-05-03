import { Input } from "@mui/joy";
import { Button } from "@mui/material";
import { useState } from "react";
import { useProfileData, useUpdateQuantity } from "../../hooks";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function QuantityCell({
    productQuantity,
    pID,
}: {
    productQuantity: number;
    pID: number;
}) {
    const [quantity, setQuantity] = useState(productQuantity);
    const { cID } = useProfileData();
    const { handleUpdateQuantity } = useUpdateQuantity();
    const handleAddQuantity = () => {
        const value = quantity + 1;
        setQuantity(value);
        handleUpdateQuantity(cID, pID, value);
    };
    const handleDecrementQuantity = () => {
        if (quantity <= 1) return;
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
