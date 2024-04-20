import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "../../styles";
import { ProductListSearch } from "../Products";

export function SearchField() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };
    function SearchProductParameters(e) {
        navigate(`/search/${e.target.value}`);
        console.log("enter send");
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
                    onChange={(e) =>
                        setSearchValue(e.target.value.toLowerCase())
                    }
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
            />
        </div>
    );
}
