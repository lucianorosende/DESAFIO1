import { ListDivider, Box, List } from "@mui/joy";
import { LoginButton, HomeButton, ProfileButton, ProductsButton } from ".";

export function NavBar() {
    return (
        <Box
            component="nav"
            aria-label="My site"
            sx={{ flexGrow: 1, padding: 1, backgroundColor: "#fff" }}
        >
            <List role="menubar" orientation="horizontal">
                <HomeButton />
                <ListDivider />
                <ProfileButton />
                <ListDivider />
                <ProductsButton />
                <LoginButton />
            </List>
        </Box>
    );
}
