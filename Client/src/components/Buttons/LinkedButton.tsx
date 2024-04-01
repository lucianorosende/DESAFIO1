import { FormGroup } from "../../styles";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function LinkedButton({
    navigateTo,
    buttonChildren,
}: {
    navigateTo: string;

    buttonChildren: string;
}) {
    return (
        <FormGroup>
            <Link to={navigateTo} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="success">
                    {buttonChildren}
                </Button>
            </Link>
        </FormGroup>
    );
}
