import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Search, StyledInputBase } from "./style";

export default function Navbar({ setPokeName }) {
  const [inputPokeName, setInputPokeName] = React.useState("");
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "black" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            POKEDEX
          </Typography>
          <Search>
            <StyledInputBase
              onChange={(e) => setInputPokeName(e.target.value)}
              placeholder="Procurar Pokemon..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              aria-label="search"
              size="big"
              onClick={() => setPokeName(inputPokeName)}
            >
              <SearchIcon />
            </IconButton>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
