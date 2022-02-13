import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ textAlign: "center" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AHP Program
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
