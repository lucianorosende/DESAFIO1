import { ListItem, ListItemButton } from "@mui/joy";

export function ProfileButton() {
    return (
        <ListItem role="none">
            <ListItemButton role="menuitem" component="a">
                Profile
            </ListItemButton>
        </ListItem>
    );
}
