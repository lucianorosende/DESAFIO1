import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "../../styles";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IProduct } from "../../interfaces";
import { ErrorButton } from "..";
import { handleLogout } from "../..";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ProductList() {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                "http://localhost:8080/api/sessions/loginData",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const responseData = await data.json();
            setProductList(responseData.data.prod);
        };
        fetchData();
    }, []);
    return (
        <>
            <Container $flexDirection="row" $minheight={75}>
                {productList.map((product: IProduct) => {
                    return (
                        <Box
                            sx={{ minWidth: 275 }}
                            margin={1}
                            key={product.pID}
                        >
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
                <ErrorButton
                    buttonChildren="Logout"
                    onClick={() => handleLogout(dispatch, navigate)}
                />
            </Container>
        </>
    );
}
