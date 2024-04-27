import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Error } from "../Animation";
import { Container, Table, TH } from "../../styles";
import { useGetCart, useProfileData } from "../../hooks";

export function Cart() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
    const { cID } = useProfileData();
    const { cart } = useGetCart(cID);
    let subtotal = 0;

    return (
        <>
            {loginSelector === true ? (
                <Container $justifyContent="top" $alignItems="center">
                    <Table>
                        <thead>
                            <tr>
                                <TH>Product Image</TH>
                                <TH>Product Name</TH>
                                <TH>Product Category</TH>
                                <TH>Price</TH>
                                <TH>Subtotal</TH>
                                <TH>Remove</TH>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((cartItem: any) => {
                                subtotal =
                                    subtotal + Math.round(cartItem._id.price);

                                return (
                                    <tr>
                                        <TH>
                                            <img
                                                src={cartItem._id.image}
                                                style={{
                                                    maxWidth: "70%",
                                                }}
                                            />
                                        </TH>
                                        <TH>{cartItem._id.title}</TH>
                                        <TH>{cartItem._id.category}</TH>
                                        <TH>
                                            {Math.round(cartItem._id.price)}
                                        </TH>
                                        <TH>{subtotal}</TH>
                                        <TH>remove</TH>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Container>
            ) : (
                <Error />
            )}
        </>
    );
}
