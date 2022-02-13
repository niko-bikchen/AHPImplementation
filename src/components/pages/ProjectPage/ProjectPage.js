import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../../../context/AppContext";
import { getProject } from "../../../context/selectors";

import NoMatchPage from "../NoMatchPage/NoMatchPage";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

const ProjectPage = () => {
  const { selectFromAppContext } = useContext(AppContext);

  const params = useParams();
  const projectData = selectFromAppContext(getProject(params.projectId));

  if (
    projectData &&
    Object.keys(projectData).length === 0 &&
    Object.getPrototypeOf(projectData) === Object.prototype
  ) {
    return <NoMatchPage />;
  }

  return (
    <Box>
      <Typography variant="h5">Name: {projectData.name}</Typography>
      <Typography variant="h5">Criterias: {projectData.criteriaNum}</Typography>
      <Typography variant="h5">
        Alternatives: {projectData.alternativesNum}
      </Typography>
    </Box>
  );
};

export default ProjectPage;
