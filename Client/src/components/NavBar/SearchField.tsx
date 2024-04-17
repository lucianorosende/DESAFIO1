import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import { ListItem, List } from "@mui/material";
import { useFetchProducts } from "../../hooks";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ccb0b0",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(3)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "18ch",
        },
    },
}));

function SearchProductParameters(e, navigate) {
    navigate(`/search/${e.target.value}`);
    console.log("enter send");
}

export function SearchField() {
    const navigate = useNavigate();
    const { productList } = useFetchProducts();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? "transition-popper" : undefined;

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onClick={handleClick}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            SearchProductParameters(e, navigate);
                        }
                    }}
                />
            </Search>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box
                            sx={{
                                border: 1,
                                p: 1,
                                bgcolor: "background.paper",
                            }}
                        >
                            <List>
                                {productList.map((product) => {
                                    return <ListItem>{product.title}</ListItem>;
                                })}
                            </List>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}
