import { Home } from "@mui/icons-material";
import { ListDivider, ListItem, ListItemButton, Box, List } from "@mui/joy";
import { Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { handleLogout } from "../..";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export function NavBar() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Box
            component="nav"
            aria-label="My site"
            sx={{ flexGrow: 1, padding: 1, backgroundColor: "#fff" }}
        >
            <List role="menubar" orientation="horizontal">
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
                <ListDivider />
                <ListItem role="none">
                    <ListItemButton role="menuitem" component="a">
                        Profile
                    </ListItemButton>
                </ListItem>
                <ListDivider />

                <ListItem role="none">
                    <ListItemButton
                        role="menuitem"
                        component="a"
                        onClick={() => navigate("/products")}
                    >
                        Products
                    </ListItemButton>
                </ListItem>
                <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
                    {loginSelector === true ? (
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            aria-label="Profile"
                            onClick={() => handleLogout(dispatch, navigate)}
                        >
                            <LogoutIcon />
                            Logout
                        </ListItemButton>
                    ) : location.pathname === "/register" ? (
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            aria-label="Profile"
                            onClick={() => navigate("/login")}
                        >
                            <Person />
                            Login
                        </ListItemButton>
                    ) : location.pathname === "/login" ? (
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            aria-label="Profile"
                            onClick={() => navigate("/register")}
                        >
                            <Person />
                            Register
                        </ListItemButton>
                    ) : (
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            aria-label="Profile"
                            onClick={() => navigate("/login")}
                        >
                            <Person />
                            Login
                        </ListItemButton>
                    )}
                </ListItem>
            </List>
        </Box>
    );
}
