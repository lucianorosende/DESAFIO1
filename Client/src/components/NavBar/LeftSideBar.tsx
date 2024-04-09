import { HomeButton, ProfileButton, ProductsButton } from ".";
import { ListDivider } from "@mui/joy";

export function LeftSideBar() {
    return (
        <>
            <HomeButton />
            <ListDivider />
            <ProfileButton />
            <ListDivider />
            <ProductsButton />
        </>
    );
}
