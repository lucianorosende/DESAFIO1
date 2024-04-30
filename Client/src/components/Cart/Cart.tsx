import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { CartEmpty, Error } from "../Animation";
import { Container, tableCellStyle } from "../../styles";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
} from "@mui/material";
import { CartBody } from ".";
import CartSubtotal from "./CartSubtotal";
import { useGetCart, useProfileData } from "../../hooks";

export function Cart() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
    const { cID } = useProfileData();
    const { cartSelector } = useGetCart(cID);
    return (
        <>
            {loginSelector === true && cartSelector.length > 0 ? (
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
                            <CartBody />
                        </Table>
                    </TableContainer>
                    <CartSubtotal />
                </Container>
            ) : loginSelector === true && cartSelector?.length === 0 ? (
                <CartEmpty />
            ) : (
                <Error />
            )}
        </>
    );
}
