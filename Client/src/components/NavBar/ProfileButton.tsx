import { ListItem, ListItemButton } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export function ProfileButton() {
    const navigate = useNavigate();
    return (
        <ListItem role="none">
            <ListItemButton
                role="menuitem"
                component="a"
                onClick={() => navigate("/profile")}
            >
                Profile
            </ListItemButton>
        </ListItem>
    );
}
