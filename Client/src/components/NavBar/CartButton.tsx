import { ListItemButton } from "@mui/joy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

export function CartButton() {
    const navigate = useNavigate();
    return (
        <ListItemButton
            role="menuitem"
            component="a"
            aria-label="Profile"
            onClick={() => navigate("/cart")}
        >
            <ShoppingCartIcon />
            Cart
        </ListItemButton>
    );
}
