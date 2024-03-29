import { FormGroup } from "../../styles";
import { PopupMaker } from "..";

export function PopupButton({
    buttonText,
    redirectReference,
    navigateTo,
}: {
    buttonText: string;
    redirectReference: string;
    navigateTo: string;
}) {
    return (
        <FormGroup>
            <PopupMaker
                buttonText={buttonText}
                redirectReference={redirectReference}
                redirect={navigateTo}
            ></PopupMaker>
        </FormGroup>
    );
}
