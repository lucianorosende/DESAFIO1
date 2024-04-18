import { useNavigate } from "react-router-dom";
import { useFetchCategories } from "../../hooks";
import { Container } from "../../styles";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";

export function CategoryList() {
    const { productList } = useFetchCategories();
    const navigate = useNavigate();
    return (
        <Container $flexDirection="row" $minheight={10} $alignItems="auto">
            {productList.map((product: string) => {
                return (
                    <Card
                        variant="outlined"
                        sx={{
                            maxWidth: "40%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            flexGrow: 1,
                            margin: 2,
                        }}
                        key={product}
                    >
                        <CardContent>
                            <Typography
                                sx={{ fontFamily: "monospace" }}
                                color="text.primary"
                            >
                                {product}
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
                                onClick={() => navigate(`/category/${product}`)}
                            >
                                Search Category
                            </Button>
                        </CardActions>
                    </Card>
                );
            })}
        </Container>
    );
}
