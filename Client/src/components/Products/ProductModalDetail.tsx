import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IProduct } from "../../interfaces";
import { Container } from "../../styles";
import { Card, CardMedia, CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAddProduct } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";

export function ProductModalDetail({
    product,
    cID,
}: {
    product: IProduct;
    cID: number | undefined;
}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { handleAddProductInCart } = useAddProduct();
    const navigate = useNavigate();
    const loginSelector = useSelector((state: RootState) => state.login.value);
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "50%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Show Details
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Card
                            variant="outlined"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                flexGrow: 1,
                                margin: 2,
                            }}
                            key={product.pID}
                        >
                            <Container $minheight={32}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        maxWidth: "50%",
                                        maxHeight: "50%",
                                    }}
                                    image={product.image}
                                />
                            </Container>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {product.category}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    ${product.price}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    Stock - {product.stock}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {product.description}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                    flexGrow: 1,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                {loginSelector === true ? (
                                    <Button
                                        variant="contained"
                                        endIcon={<AddShoppingCartIcon />}
                                        onClick={() =>
                                            handleAddProductInCart(
                                                product.pID,
                                                cID,
                                                product
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </Button>
                                ) : (
                                    <Button
                                        color="error"
                                        variant="contained"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login To Purchase
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
