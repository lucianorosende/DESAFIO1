import { FormGroup } from "../../styles";
import { Button } from "@mui/material";

export function ClickButton({
    buttonChildren,
    onClick,
    marginTop,
    type,
}: {
    buttonChildren: string;
    onClick?: () => void;
    marginTop?: number;
    type?: string;
}) {
    return (
        <FormGroup>
            <Button
                onClick={onClick}
                variant="contained"
                style={{ marginTop: marginTop || 0 }}
                type={"submit" || type}
            >
                {buttonChildren}
            </Button>
        </FormGroup>
    );
}
