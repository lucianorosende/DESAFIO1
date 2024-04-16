import { HomeButton, ProfileButton, ProductsButton, SearchField } from ".";
import { ListDivider } from "@mui/joy";

export function LeftSideBar() {
    return (
        <>
            <HomeButton />
            <ListDivider />
            <ProfileButton />
            <ListDivider />
            <SearchField />
        </>
    );
}
