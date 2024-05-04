import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export function Messages() {
    return (
        <div style={{ position: "fixed", bottom: 25, right: 25, zIndex: 1 }}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    );
}
