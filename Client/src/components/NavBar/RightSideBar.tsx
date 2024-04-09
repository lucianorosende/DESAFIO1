import { ListItem } from "@mui/joy";
import { CartButton, LoginButton } from ".";

export function RightSideBar() {
    return (
        <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
            <CartButton />
            <LoginButton />
        </ListItem>
    );
}
