import { useFetchAllProducts } from "../../hooks";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { ListItem, List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SetStateAction, Dispatch } from "react";

export function ProductListSearch({
    open,
    searchValue,
    anchorEl,
    setOpen,
}: {
    open: boolean;
    searchValue: string;
    anchorEl: null | HTMLElement;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const { productList } = useFetchAllProducts(searchValue);
    const navigate = useNavigate();
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? "transition-popper" : undefined;

    return (
        <>
            {searchValue.length && productList.length > 0 ? (
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
                                        return (
                                            <ListItem
                                                key={product.title}
                                                sx={{
                                                    backgroundColor: "white",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "primary.main",
                                                    },
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    navigate(product.title);
                                                    setOpen(false);
                                                }}
                                            >
                                                {product.title}
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                        </Fade>
                    )}
                </Popper>
            ) : null}
        </>
    );
}
