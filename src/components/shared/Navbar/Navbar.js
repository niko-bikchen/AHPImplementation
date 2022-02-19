import React from "react";

import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from '@mui/material/Button'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
          >
            AHP Program
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
