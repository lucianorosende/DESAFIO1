import { useLocation } from "react-router-dom";
import {
    useFetchCategoryProducts,
    useAddProduct,
    useProfileData,
} from "../../hooks";
import { IProduct } from "../../interfaces";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/store";
import { Container } from "../../styles";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
} from "@mui/material";
import { ProductModalDetail } from "../Products";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export function CategoryListSearch() {
    const location = useLocation();
    const { productList } = useFetchCategoryProducts(location.pathname);
    const { cID } = useProfileData();
    const { handleAddProductInCart } = useAddProduct();
    const loginSelector = useSelector((state: RootState) => state.login.value);
    const navigate = useNavigate();
    return (
        <Container $flexDirection="row" $minheight={75} $alignItems="auto">
            {productList.map((product: IProduct) => {
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
                            <Typography variant="h5" component="div">
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
