import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

import ProjectsList from "./components/ProjectsLists.js/ProjectsList";
import ProjectCreationModal from "./components/ProjectCreationModal/ProjectCreationModal";

const Body = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
      }}
    >
      <Paper sx={{ padding: "20px 10px" }}>
        <Typography variant="h6" textAlign="center">
          Projects
        </Typography>
        <ProjectsList />
        <ProjectCreationModal />
      </Paper>
    </Box>
  );
};

export default Body;
