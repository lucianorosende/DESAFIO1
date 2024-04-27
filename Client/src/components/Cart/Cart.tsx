import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Error } from "../Animation";
import { Container } from "../../styles";
import { useGetCart, useProfileData } from "../../hooks";
import { ClickButton, ErrorButton } from "../Buttons";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
} from "@mui/material";

export function Cart() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
    const { cID } = useProfileData();
    const { cart } = useGetCart(cID);
    let subtotal = 0;
    const tableCellStyle = {
        fontWeight: "bold",
        fontSize: "15px",
    };
    return (
        <>
            {loginSelector === true ? (
                <Container $justifyContent="center" $alignItems="center">
                    <TableContainer sx={{ maxWidth: "80%" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>
                                        Product Image
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        Product Name
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        Product Category
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        Quantity
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        Price
                                    </TableCell>
                                    <TableCell sx={tableCellStyle}>
                                        Remove
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((cartItem: any) => {
                                    subtotal =
                                        subtotal +
                                        Math.round(
                                            cartItem._id.price *
                                                cartItem.quantity
                                        );
                                    return (
                                        <>
                                            <TableRow>
                                                <TableCell>
                                                    <img
                                                        src={cartItem._id.image}
                                                        style={{
                                                            maxWidth: "70%",
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={tableCellStyle}>
                                                    {cartItem._id.title}
                                                </TableCell>
                                                <TableCell sx={tableCellStyle}>
                                                    {cartItem._id.category}
                                                </TableCell>
                                                <TableCell sx={tableCellStyle}>
                                                    {cartItem.quantity}
                                                </TableCell>
                                                <TableCell sx={tableCellStyle}>
                                                    $
                                                    {Math.round(
                                                        cartItem._id.price *
                                                            cartItem.quantity
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <ErrorButton buttonChildren="Remove" />
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div
                        style={{
                            alignSelf: "flex-end",
                            margin: "2% 10% 2% 0",

                            border: "2px solid white",
                            padding: "10px",
                            fontFamily: "monospace",
                            fontSize: "20px",
                            fontWeight: "bold",
                        }}
                    >
                        Subtotal: ${subtotal}
                        <br />
                        Tax: $tax
                        <br />
                        Total: $total
                        <br />
                        <ClickButton buttonChildren="Checkout" marginTop={10} />
                    </div>
                </Container>
            ) : (
                <Error />
            )}
        </>
    );
}
