import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "../../styles";
import { ProductListSearch } from "../Products";
import { toast } from "react-toastify";

export function SearchField() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (
        event:
            | React.MouseEvent<HTMLElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };
    function SearchProductParameters(e: any) {
        if (e.currentTarget.value === "") {
            toast.warning("No info put in search field!");
        } else {
            navigate(`/search/${e.currentTarget.value}`);
            handleClick(e);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onClick={handleClick}
                    onChange={(e) => {
                        setSearchValue(e.target.value.toLowerCase());
                        setOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            SearchProductParameters(e);
                        }
                    }}
                />
            </Search>
            <ProductListSearch
                open={open}
                searchValue={searchValue}
                anchorEl={anchorEl}
                setOpen={setOpen}
            />
        </div>
    );
}
