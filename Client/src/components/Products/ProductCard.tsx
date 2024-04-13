import { Card, CardMedia } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Container, IProduct } from "../..";

export function ProductCard({ list }: { list: IProduct[] }) {
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
        </Container>
    );
}
