import { ListItem, ListItemButton } from "@mui/joy";
import { useLogout } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";

export function LoginButton() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
    const navigate = useNavigate();
    const { handleLogout } = useLogout();
    return (
        <>
            <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
                {loginSelector === true ? (
                    <ListItemButton
                        role="menuitem"
                        component="a"
                        aria-label="Profile"
                        onClick={handleLogout}
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
        </>
    );
}
