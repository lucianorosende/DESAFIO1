import { RefObject } from "react";
import { FormGroup } from "../../styles";
import { TextField } from "@mui/material";

export function FormInput({
    inputType,
    inputName,
    reference,
    labelChildren,
}: {
    inputType: string;
    inputName: string;
    reference: RefObject<HTMLInputElement>;
    labelChildren: string;
}) {
    return (
        <FormGroup>
            <TextField
                fullWidth
                id={inputName}
                label={labelChildren}
                variant="filled"
                type={inputType}
                color="primary"
                inputRef={reference}
                sx={{ backgroundColor: "#fff" }}
                required
            />
        </FormGroup>
    );
}
