import { Box, List } from "@mui/joy";
import { LeftSideBar, RightSideBar } from ".";
import { useIsLogged } from "../../hooks";

export function NavBar() {
    useIsLogged();
    return (
        <Box
            component="nav"
            aria-label="My site"
            sx={{
                flexGrow: 1,
                padding: 1,
                backgroundColor: "#fff",
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}
        >
            <List role="menubar" orientation="horizontal">
                <LeftSideBar />
                <RightSideBar />
            </List>
        </Box>
    );
}
