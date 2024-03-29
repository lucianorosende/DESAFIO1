import { FormGroup, ButtonMaker } from "../../styles";

export function NormalButton({
    buttonBGcolor,
    buttonHoverColor,
    buttonChildren,
}: {
    buttonBGcolor: string;
    buttonHoverColor: string;
    buttonChildren: string;
}) {
    return (
        <FormGroup>
            <ButtonMaker
                $background_color={buttonBGcolor}
                $background_hover_color={buttonHoverColor}
            >
                {buttonChildren}
            </ButtonMaker>
        </FormGroup>
    );
}
