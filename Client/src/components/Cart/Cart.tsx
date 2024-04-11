import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Error } from "../Animation";
import { Container, Table, TH } from "../../styles";

export function Cart() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
    return (
        <>
            {loginSelector === true ? (
                <Container $justifyContent="top" $alignItems="center">
                    <Table>
                        <thead>
                            <tr>
                                <TH>Product Name</TH>
                                <TH>Product Category</TH>
                                <TH>Stock</TH>
                                <TH>Price</TH>
                                <TH>Subtotal</TH>
                                <TH>Remove</TH>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <TH>Product Image</TH>
                                <TH>Product Name</TH>
                                <TH>Quantity</TH>
                                <TH>Unit Price</TH>
                                <TH>Subtotal</TH>
                                <TH>Remove</TH>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            ) : (
                <Error />
            )}
        </>
    );
}
