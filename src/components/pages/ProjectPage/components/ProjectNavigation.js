import React from "react";

import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";

const ProjectNavigation = ({
  pageStep,
  moveToNextStep,
  moveToPrevStep,
  goToMainMenu = () => {},
  marginTop,
}) => (
  <Box marginTop={marginTop || "70px"}>
    <Stack direction="row" spacing={2} justifyContent="center">
      {pageStep > 0 && (
        <Button
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
          onClick={moveToPrevStep}
        >
          Previous Step
        </Button>
      )}
      <Button
        variant="contained"
        endIcon={<HomeIcon />}
        component={Link}
        to="/"
        onClick={goToMainMenu}
      >
        Main Menu
      </Button>
      {pageStep !== 3 && (
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          onClick={moveToNextStep}
        >
          Next Step
        </Button>
      )}
    </Stack>
  </Box>
);

export default ProjectNavigation;
