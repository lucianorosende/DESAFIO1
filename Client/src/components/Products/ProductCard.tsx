import {
    Card,
    CardMedia,
    CardActions,
    CardContent,
    Button,
    Typography,
    Rating,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Container, IProduct } from "../..";
import { ProductModalDetail } from "./ProductModalDetail";
import { useAddProduct, useProfileData } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";
export function ProductCard({ list }: { list: IProduct[] }) {
    const { cID } = useProfileData();
    const { handleAddProductInCart } = useAddProduct();
    const loginSelector = useSelector((state: RootState) => state.login.value);
    const navigate = useNavigate();
    return (
        <Container $flexDirection="row" $minheight={75} $alignItems="auto">
            {list.map((product: IProduct) => {
                return (
                    <Card
                        variant="outlined"
                        sx={{
                            maxWidth: "20%",
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
                                    maxWidth: "70%",
                                    maxHeight: "70%",
                                }}
                                image={product.image}
                            />
                        </Container>
                        <CardContent>
                            <Rating
                                name="read only"
                                value={product.rating}
                                precision={0.5}
                                readOnly
                            />
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    whiteSpace: "nowrap",
                                    width: "200px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                {product.title}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                ${product.price}
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{
                                justifyContent: "center",
                                alignItems: "flex-end",
                                flexGrow: 1,
                            }}
                        >
                            <ProductModalDetail product={product} cID={cID} />
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
                );
            })}
        </Container>
    );
}
