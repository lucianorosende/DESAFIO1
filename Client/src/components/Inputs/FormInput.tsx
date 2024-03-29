import { RefObject } from "react";
import { FormGroup, Label, Input } from "../../styles";

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
            <Label htmlFor={inputName}>{labelChildren}</Label>
            <Input
                type={inputType}
                id={inputName}
                name={inputName}
                ref={reference}
                required
            />
        </FormGroup>
    );
}
