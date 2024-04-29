import { Container } from "../../styles";
import { Stack, Pagination } from "@mui/material";
import { ChangeEvent } from "react";

export function ProductPagination({
    pages,
    setActualPage,
}: {
    pages: undefined | number;
    setActualPage: (page: number) => void;
}) {
    return (
        <Container $minheight={10}>
            <Stack spacing={2}>
                <Pagination
                    count={pages}
                    color="primary"
                    sx={{
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: 5,
                    }}
                    onChange={(event: ChangeEvent<unknown>, page: number) => {
                        setActualPage(page);
                    }}
                />
            </Stack>
        </Container>
    );
}
