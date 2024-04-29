import { HomeButton, ProfileButton, SearchField } from ".";
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
