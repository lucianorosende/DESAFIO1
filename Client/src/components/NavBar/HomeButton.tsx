import { ListItem, ListItemButton } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";

export function HomeButton() {
    const navigate = useNavigate();
    return (
        <ListItem role="none">
            <ListItemButton
                role="menuitem"
                component="a"
                aria-label="Home"
                onClick={() => navigate("/")}
            >
                <Home />
            </ListItemButton>
        </ListItem>
    );
}
