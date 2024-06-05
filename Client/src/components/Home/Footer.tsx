import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";

export function Footer() {
    return (
        <Sheet
            variant="solid"
            invertedColors
            sx={{
                flexGrow: 1,
                p: 2,
                borderRadius: { xs: 0, sm: "sm" },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center",
                }}
            >
                Made by Luciano Rosende
            </Box>
        </Sheet>
    );
}
