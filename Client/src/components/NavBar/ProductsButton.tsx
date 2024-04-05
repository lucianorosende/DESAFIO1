import { ListItem, ListItemButton } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export function ProductsButton() {
    const navigate = useNavigate();
    return (
        <ListItem role="none">
            <ListItemButton
                role="menuitem"
                component="a"
                onClick={() => navigate("/products")}
            >
                Products
            </ListItemButton>
        </ListItem>
    );
}
