import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";

export function Footer() {
    const [color, setColor] = React.useState<ColorPaletteProp>("neutral");
    return (
        <Sheet
            variant="solid"
            invertedColors
            sx={{
                ...(color !== "neutral" && {
                    bgcolor: `${color}.800`,
                }),
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
