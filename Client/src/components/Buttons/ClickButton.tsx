import { FormGroup, ButtonMaker } from "../../styles";

export function ClickButton({
    buttonBGcolor,
    buttonHoverColor,
    buttonChildren,
    onClick,
}: {
    buttonBGcolor: string;
    buttonHoverColor: string;
    buttonChildren: string;
    onClick: () => void;
}) {
    return (
        <FormGroup>
            <ButtonMaker
                $background_color={buttonBGcolor}
                $background_hover_color={buttonHoverColor}
                onClick={onClick}
            >
                {buttonChildren}
            </ButtonMaker>
        </FormGroup>
    );
}
