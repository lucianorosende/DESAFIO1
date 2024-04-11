import { Card, CardMedia } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useFetch } from "../../hooks";
import { IProduct } from "../..";

export function ProductCard() {
    const { productList } = useFetch();
    return (
        <>
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
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                minWidth: 100,
                                minHeight: 100,
                            }}
                            image={product.image}
                        />
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {product.pID}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {product.title}
                            </Typography>

                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                ${product.price}
                            </Typography>
                            {/* <Typography variant="body2">
                                    {product.description}
                                    <br />
                                </Typography> */}
                        </CardContent>
                        <CardActions
                            sx={{
                                justifyContent: "center",
                                alignItems: "flex-end",
                                flexGrow: 1,
                            }}
                        >
                            <Button variant="contained">Show Details</Button>
                            <Button
                                variant="contained"
                                endIcon={<AddShoppingCartIcon />}
                            >
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                );
            })}
        </>
    );
}
