import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Error } from "../Animation";
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

export function Cart() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
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
                            <CartBody />
                        </Table>
                    </TableContainer>
                    <CartSubtotal />
                </Container>
            ) : (
                <Error />
            )}
        </>
    );
}
