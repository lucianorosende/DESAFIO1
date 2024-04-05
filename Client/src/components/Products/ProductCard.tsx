import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useFetch } from "../../hooks";
import { IProduct } from "../..";

export function ProductCard() {
    const { productList } = useFetch();
    return (
        <>
            {productList.map((product: IProduct) => {
                return (
                    <Box sx={{ minWidth: 275 }} margin={1} key={product.pID}>
                        <Card variant="outlined">
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
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    ${product.price}
                                </Typography>
                                <Typography variant="body2">
                                    {product.description}
                                    <br />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    endIcon={<AddShoppingCartIcon />}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                );
            })}
        </>
    );
}
