import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const MoonSearch = () => {
    // searchVal is the value the user searches for
    const [searchVal, setSearchVal] = useState("");

    return (
        <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", flexDirection: "column", padding: 20}}>
            <form>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                    setSearchVal(e.target.value);
                }}
                    label="Search for a moon"
                    placeholder="Example: Titan"
                    size="small"/>

                <IconButton type="submit" aria-label="search">
                    <SearchIcon style={{ fill: "blue"}}/>
                </IconButton>
            </form>

            {/* At this point, we have a nav bar and a search value, now we just need to call the api for it and display*/}
            <p>searchVal: {searchVal}</p>
    </div>
    );
}

export default MoonSearch;
