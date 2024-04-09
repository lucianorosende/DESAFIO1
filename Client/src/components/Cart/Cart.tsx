import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Error } from "../Animation";

export function Cart() {
    const loginSelector = useSelector((state: RootState) => state.login.value);
    return (
        <>{loginSelector === true ? <div>CART ITEMS HERE</div> : <Error />}</>
    );
}
