import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

import ProjectNavigation from "./ProjectNavigation";

const ProjectOverview = ({
  projectData,
  pageStep,
  moveToNextStep,
  moveToPrevStep,
}) => (
  <Box>
    <Stack direction="column" spacing={8}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Paper sx={{ padding: "20px" }}>
          <Typography>{projectData.target}</Typography>
        </Paper>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {projectData.criterias.map((criteria) => (
          <Box
            key={criteria.id}
            sx={{
              marginTop: projectData.alternatives.length > 1 ? "15px" : "0px",
              marginRight: projectData.alternatives.length > 1 ? "20px" : "0px",
            }}
          >
            <Paper sx={{ padding: "20px" }}>
              <Typography>{criteria.name}</Typography>
            </Paper>
          </Box>
        ))}
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {projectData.alternatives.map((alternative) => (
          <Box
            key={alternative.id}
            sx={{
              marginTop: projectData.alternatives.length > 1 ? "15px" : "0px",
              marginRight: projectData.alternatives.length > 1 ? "20px" : "0px",
            }}
          >
            <Paper sx={{ padding: "20px" }}>
              <Typography>{alternative.name}</Typography>
            </Paper>
          </Box>
        ))}
      </Stack>
    </Stack>
    <ProjectNavigation
      pageStep={pageStep}
      moveToNextStep={moveToNextStep}
      moveToPrevStep={moveToPrevStep}
    />
  </Box>
);

export default ProjectOverview;
