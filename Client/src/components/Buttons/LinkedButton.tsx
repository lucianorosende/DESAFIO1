import { FormGroup, ButtonMaker } from "../../styles";
import { Link } from "react-router-dom";

export function LinkedButton({
    navigateTo,
    buttonBGcolor,
    buttonHoverColor,
    buttonChildren,
}: {
    navigateTo: string;
    buttonBGcolor: string;
    buttonHoverColor: string;
    buttonChildren: string;
}) {
    return (
        <FormGroup>
            <Link to={navigateTo} style={{ textDecoration: "none" }}>
                <ButtonMaker
                    $background_color={buttonBGcolor}
                    $background_hover_color={buttonHoverColor}
                >
                    {buttonChildren}
                </ButtonMaker>
            </Link>
        </FormGroup>
    );
}
