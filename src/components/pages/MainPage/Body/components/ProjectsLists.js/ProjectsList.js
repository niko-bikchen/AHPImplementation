import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { AppContext } from "../../../../../../context/AppContext";
import { getProjects } from "../../../../../../context/selectors";

import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import Typography from "@mui/material/Typography";

const ProjectsList = () => {
  const { selectFromAppContext } = useContext(AppContext);

  const projects = selectFromAppContext(getProjects);

  if (projects.length === 0) {
    return (
      <Box marginBottom="20px" marginTop="15px" textAlign="center">
        <Typography>No available projects.</Typography>
        <Typography>
          Create a new project by pressing a button below.
        </Typography>
      </Box>
    );
  }

  return (
    <Box marginBottom="10px" marginTop="10px">
      <List>
        {projects.map((project) => (
          <ListItem disablePadding key={project.id}>
            <ListItemButton component={Link} to={`/projects/${project.id}`}>
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProjectsList;
