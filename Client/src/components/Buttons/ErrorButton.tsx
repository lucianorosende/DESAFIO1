import { FormGroup } from "../../styles";
import { Button } from "@mui/material";

export function ErrorButton({
    buttonChildren,
    onClick,
    marginTop,
}: {
    buttonChildren: string;
    onClick: () => void;
    marginTop?: number;
}) {
    return (
        <FormGroup>
            <Button
                variant="contained"
                color="error"
                onClick={onClick}
                style={{ marginTop: marginTop || 0 }}
            >
                {buttonChildren}
            </Button>
        </FormGroup>
    );
}
